import { Terminal } from "../../Terminal";
import { CONSTANTS } from "../../Constants";
import { BaseServer } from "../../Server/BaseServer";
import { Player } from "@player";
import { formatRam } from "../../ui/formatNumber";
import { SpecialServers } from "src/Server/data/SpecialServers";

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
  info.forEach((line) => Terminal.print(line));
  Terminal.print(" ");
  // Print Theme colors
}
