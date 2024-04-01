import { Terminal } from "../../Terminal";
import { CONSTANTS } from "../../Constants";
import { Settings } from "../../Settings/Settings";
import { BaseServer } from "../../Server/BaseServer";
import { formatRam } from "../../ui/formatNumber";

export function neofetch(_args: (string | number | boolean)[], server: BaseServer): void {
  const numPrograms = server.programs.length;
  const info = [
    server.hostname,
    "-".repeat(server.hostname.length),
    `OS: BitOS`,
    `Packages: 284 (pkgman) ${numPrograms !== 0 ? `${numPrograms} (prgm)` : ""}`,
    `Shell: BitShell ${CONSTANTS.VersionString}`,
    `Theme: ${Settings.themeName}`,
    `CPU: Unknown (${server.cpuCores} Cores)`,
    `Memory: ${formatRam(server.ramUsed)} / ${formatRam(server.maxRam)}`
  ];
  info.forEach((line) => Terminal.print(line));
}
