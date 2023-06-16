import chalk from "chalk";
import { setPathName, fileWritePath } from "../file";
import fs from "node:fs";
import {
  fileOperationType,
  globalHostSettings,
  readFileOperate,
} from "../utils";

export const getHostList = () => {
  const filePath = setPathName(fileWritePath);
  const getHost = readFileOperate(fileOperationType.selectHost);
  // 同步读取
  fs.readdirSync(`${filePath}`, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.name == getHost) {
      console.log("*" + " " + chalk.green(dirent.name));
    } else {
      console.log("  " + dirent.name);
    }
  });
};
