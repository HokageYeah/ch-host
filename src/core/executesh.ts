import path from "path";
import { exec, spawnSync, spawn } from "child_process";
import { setPathName, shMacPath, shWindowPath } from "../file";
import { globalHostSettings, isMac, isWindows, saveSelectHost } from "../utils";

export const executeShell = (host: string) => {
  const decodedShellScriptPath = setPathName(shMacPath);
  let childProcess;
  if (isMac()) {
    childProcess = spawn("sh", [decodedShellScriptPath, host], {
      stdio: "inherit", // 将标准输入重定向到 /dev/null
    });
  }
  if (isWindows()) {
    childProcess = spawn("bash", [shWindowPath, host], {
      stdio: "inherit", // 将标准输入重定向到 /dev/null
    });
  }
  childProcess?.on("error", (error) => {
    console.error(`执行命令时发生错误: ${error.message}`);
  });

  childProcess?.on("close", (code) => {
    console.log(`子进程退出，退出码: ${code}`);
  });
  childProcess?.on("exit", (code: number) => {
    saveSelectHost(host);
    if (code !== 0) {
      console.error(`执行命令时发生错误，退出码: ${code}`);
    }
  });
};

//   这里不能执行 exec 得用 spawn 因为shell脚本中有输入的异步回掉，所以需要用spawn函数来启动子进程并执行 Shell 脚本， 这样可以实现非阻塞的执行，并可以处理脚本中的输入和输出。
//   exec(`sh ${decodedShellScriptPath}`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`执行命令时发生错误: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`命令输出错误: ${stderr}`);
//       return;
//     }
//     console.log(`命令输出结果: ${stdout}`);
//   });
