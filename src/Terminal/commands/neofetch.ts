import { Terminal } from "../../Terminal";
import { BaseServer } from "../../Server/BaseServer";

export function neofetch(_args: (string | number | boolean)[], server: BaseServer): void {
  Terminal.print(server.cpuCores + " Core(s), brought to you by neofetch");
}
