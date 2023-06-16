import chalk from "chalk";
import { isMac, isWindows } from "../utils";
import { executeShell } from "./executesh";

export const useHost = (host: string) => {
  if (isMac()) {
    console.log(chalk.green("快看他用的isMac"));
    executeShell(host)
  }
  if (isWindows()) {
    console.log(chalk.green("哎～他还在用的Windows"));
  }
};
