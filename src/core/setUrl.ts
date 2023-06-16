import chalk from "chalk";
import { fileOperationType, readFileOperate, saveFileOperate } from "../utils";

export const setRequestUrl = (requestUrl: string) => {
  saveFileOperate(requestUrl, fileOperationType.requestUrl);
};

export const getRequestUrl = () => {
    const geturl = readFileOperate(fileOperationType.requestUrl);
    console.log(chalk.green(geturl));
  };