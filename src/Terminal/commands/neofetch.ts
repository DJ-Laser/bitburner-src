import { Terminal } from "../../Terminal";
import { CONSTANTS } from "../../Constants";
import { BaseServer } from "../../Server/BaseServer";
import { Player } from "@player";
import { formatRam } from "../../ui/formatNumber";
import { SpecialServers } from "../../Server/data/SpecialServers";

/**
 * List the number of packages allong with the package manager name
 * Returns an empty string if numPackages is 0 or less
 * @param name The name of the package manager
 * @returns A string of package info for neofetch, for example: "47 (pkgman)"
 */
function listPackages(numPackages: number, name: string) {
  return numPackages > 0 ? `${numPackages} (${name}) ` : "";
}

export function neofetch(_args: (string | number | boolean)[], server: BaseServer): void {
  let packageInfo = `Packages: ${listPackages(284, "pkgman")}`;
  if (server.hostname == SpecialServers.Home) {
    let numSourceFiles = 0;
    Player.sourceFiles.forEach((lvl) => (numSourceFiles += lvl));
    packageInfo += listPackages(server.programs.length, "prgm") + listPackages(numSourceFiles, "sfile");
  }

  const info = [
    server.hostname,
    "-".repeat(server.hostname.length),
    `OS: BitOS`,
    packageInfo,
    `Shell: BitShell ${CONSTANTS.VersionString}`,
    `CPU: Unknown (${server.cpuCores} Cores)`,
    `Memory: ${formatRam(server.ramUsed)} / ${formatRam(server.maxRam)}`,
  ];
  const asciiArt = defaultServerArt;
  const artWidth = asciiArt[0].length;
  for (let i = 0; i < Math.max(asciiArt.length, info.length); i++) {
    // Ensure Info is at correct indentation even if art is shorter than info
    const artLine = asciiArt[i] ?? " ".repeat(artWidth);
    Terminal.print(`${artLine}  ${info[i] ?? ""}`);
  }
  Terminal.print(" ");
  // Print Theme colors
}

// TODO: Make better art
const defaultServerArt = [
  "____________________",
  "|__________________|",
  "|                  |",
  "|  [x]  [___]  O   |",
  "|__________________|",

  "____________________",
  "|__________________|",
  "|                  |",
  "|  o  --    [__]   |",
  "|   []  [_]  o  o  |",
  "|__________________|",
] as const;
