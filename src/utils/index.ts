// 文本打印输出文字颜色
import chalk from "chalk";
import {
  fileSelectPath,
  fileWritePath,
  reuqestUrlPath,
  setPathName,
} from "../file";
import fs from "node:fs";
/**
 *
 * @returns 是不是windows
 */
export const isWindows = () => {
  return process.platform === "win32";
};
/**
 *
 * @returns 是不是mac
 */
export const isMac = () => {
  return process.platform === "darwin";
};
/**
 *
 * @returns 芯片处理逻辑 inter x64
 */
export const isX64 = () => {
  return process.arch === "x64";
};

/**
 *
 * 限制命令只能输入 "test", "staging", "prod", "old-bak", "dev"
 */
const validHosts = ["test", "staging", "prod", "old-bak", "dev"];
export const isErrorHost = (hostStr: string) => {
  if (!validHosts.includes(hostStr)) {
    console.error(chalk.red("错误的host！请从下列选择一个: ", validHosts));
    return true;
  }
  return false;
};

/**
 *
 * 查看是否设置了请求host的URL，如果没有设置则其他命令都不可用
 */
export const isNoSetRequestUrl = (): boolean => {
  if( readFileOperate(fileOperationType.requestUrl).length == 0) {
    console.error(chalk.red("你未设置请求host的URL！请使用seturl 设置"));
    return true
  }
  return false;
};

/**
 *
 * 教研链接地址是否正常
 */
const urlRegex = /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
export function isValidUrl(url: string) {
  if(!urlRegex.test(url)) {
    console.error(chalk.red("请输入正确的请求URL地址！"));
    return true
  }
  return false;
}

export enum fileOperationType {
  selectHost = 1,
  requestUrl,
}

const getFilePath = (fileOperation: fileOperationType): string => {
  let path = "";
  switch (fileOperation) {
    case fileOperationType.selectHost:
      path = fileSelectPath;
      break;
    case fileOperationType.requestUrl:
      path = reuqestUrlPath;
      break;
    default:
      break;
  }
  return path;
};

/**
 *
 * 将当前选中的host记录到selectHost文件中
 */
export const saveFileOperate = (
  host: string,
  fileOperation: fileOperationType
) => {
  try {
    const filePath = setPathName(getFilePath(fileOperation));
    fs.writeFileSync(filePath, host);
  } catch (error) {
    console.error(chalk.red("文件写入失败！", error));
    process.exit(1); // 退出并返回一个非零退出码
  }
};

/**
 *
 * 读取选中的host
 */
export const readFileOperate = (fileOperation: fileOperationType) => {
  const filePath = setPathName(getFilePath(fileOperation));
  return fs.readFileSync(filePath, "utf-8");
};

/**
 *
 * 创建一个单例类，用来保存当前的host
 */
export interface HostSettings {
  host: string;
}
class HostSettingsSingleton implements HostSettings {
  private static instance: HostSettingsSingleton;

  private _host: string = "test";

  public get host(): string {
    return this._host;
  }

  public set host(value: string) {
    this._host = value;
  }

  private constructor() {}

  public static getInstance(): HostSettingsSingleton {
    if (!HostSettingsSingleton.instance) {
      HostSettingsSingleton.instance = new HostSettingsSingleton();
    }
    return HostSettingsSingleton.instance;
  }
}
export const globalHostSettings = HostSettingsSingleton.getInstance();
