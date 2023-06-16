import chalk from "chalk";
import { setPathName, fileWritePath } from "../file";
import fs from "node:fs";
import { globalHostSettings, readSelectHost } from "../utils";

export const getHostList = () => {
  const filePath = setPathName(fileWritePath);
  const getHost = readSelectHost();
  // 同步读取
  fs.readdirSync(`${filePath}`, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.name == getHost) {
      console.log(chalk.redBright("○") + ' ' + chalk.green(dirent.name));
    } else {
      console.log('  ' + chalk.green(dirent.name));
    }
  });
};
