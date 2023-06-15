// 文本打印输出文字颜色
import chalk from "chalk";
import { fileSelectPath, fileWritePath, setPathName } from "../file";
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
 * 将当前选中的host记录到selectHost文件中
 */
export const saveSelectHost = (host: string) => {
  const filePath = setPathName(fileSelectPath);
  fs.writeFileSync(filePath, host);
};

/**
 *
 * 读取选中的host
 */
export const readSelectHost = () => {
  const filePath = setPathName(fileSelectPath);
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
      console.log("HostSettingsSingleton");
      HostSettingsSingleton.instance = new HostSettingsSingleton();
    }
    return HostSettingsSingleton.instance;
  }
}
export const globalHostSettings = HostSettingsSingleton.getInstance();
