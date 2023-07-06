import path from "node:path";
import yeahUrl from "node:url";

/**
 * 
 *
这段代码的主要目的是处理文件路径，并生成一个跨平台兼容的路径。
path.normalize(decodedShellScriptPath)：

decodedShellScriptPath 是解码后的文件路径。
path.normalize 函数将路径规范化，去除多余的斜杠、点和其他冗余部分，并返回规范化后的路径。
示例输出：/D:/敲敲代码/项目代码合集/Node项目/ch-host/dist/changeHost/hostList
path.join(".", normalizedPath)：

path.join 函数将路径片段连接在一起，生成一个新的路径。
第一个参数 "." 表示当前目录。
normalizedPath 是已经被规范化的文件路径。
path.join 会根据操作系统自动选择适当的路径分隔符，确保生成的路径在不同平台上都能正常使用。
示例输出（在 Windows 上）：.\D:\敲敲代码\项目代码合集\Node项目\ch-host\dist\changeHost\hostList
示例输出（在 macOS 上）：./D:/敲敲代码/项目代码合集/Node项目/ch-host/dist/changeHost/hostList
 * 
 */

export const setPathName = (filePath?: string) => {
  /**
   * 方案一。如下
   * 此方案去除了windows上链接最开始的/，能够正常运行
   * 但是去除后在Mac上的地址显示有问题
  */
  // const logFilePath = path.resolve(process.cwd());
  // const shellScriptPath = new URL(filePath ?? "", import.meta.url).pathname;
  // const decodedShellScriptPath = decodeURI(shellScriptPath);

  // const normalizedPath = path.normalize(decodedShellScriptPath);
  // console.log('normalizedPath', normalizedPath);  
  // const crossPlatformPath = path.join(".", normalizedPath);
  // console.log('crossPlatformPath', crossPlatformPath);
  //   console.log("hello command", logFilePath);
  //   console.log("hello decodedShellScriptPath", decodedShellScriptPath);


  
  /**
   * 方案二。如下
   * 使用fileURLToPath、dirname、解决window、Mac上的地址问题 因为使用的是ES module的规范（能够浏览器也兼容）， 
   * 使用了import.meta.url;。 如果是commonjs规范 直接使用 内置的__dirname就可以
  */
  const url = import.meta.url; // 获取当前脚本文件的url
  const __dirname = path.dirname(yeahUrl.fileURLToPath(url))
  const crossPlatformPath = path.resolve(__dirname, filePath!)
  return crossPlatformPath;
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