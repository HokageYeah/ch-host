import { isMac, isWindows } from "../utils";
import { executeShell } from "./executesh";

export const useHost = (host: string) => {
  if (isMac()) {
    console.log("快看他用的isMac");
    executeShell(host)
  }
  if (isWindows()) {
    console.log("哎～他还在用的Windows");
  }
};
