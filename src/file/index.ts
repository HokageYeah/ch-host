import path from "path";

export const setPathName = (filePath?: string) => {
  const logFilePath = path.resolve(process.cwd());
  const shellScriptPath = new URL(filePath ?? "", import.meta.url).pathname;
  const decodedShellScriptPath = decodeURI(shellScriptPath);
  //   console.log("hello command", logFilePath);
  //   console.log("hello decodedShellScriptPath", decodedShellScriptPath);
  return decodedShellScriptPath;
};
// sh脚本执行路径
export const shMacPath = "../changeHost/shellChangeHost.sh";
export const shWindowPath = "../changeHost/windowChangeHost.sh";
// 文件写入路径
export const fileWritePath = "../changeHost/hostList";
// 当前选中host的文件路径
export const fileSelectPath = "../changeHost/selectHost";
// 当前请求host url的文件路径
export const reuqestUrlPath = "../changeHost/requestUrl";