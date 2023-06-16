import https from "https";
// 文本打印输出文字颜色
import chalk from "chalk";
// 进度条
import progress from "cli-progress";
// 下载速度
import speedometer from "speedometer";
// 写入文件
import fs from "node:fs";
import { setPathName, fileWritePath } from "../file";
import { fileOperationType, readFileOperate } from "../utils";

const concatBuff = (buffList: any[], buffSize: number) =>
  Buffer.concat([...buffList], buffSize);

// 创建一个 speedometer 实例
const speed = speedometer();
export const installHost = (hostStr: string) => {
  if (!hostStr) console.error(chalk.red("未指明下载的host"));
  //创建进度条实例
  const progressBar = new progress.Bar(
    {
      format:
        hostStr +
        "下载进度 |" +
        chalk.green("{bar}") +
        "| {percentage}% || {value}/{total} Chunks || Speed: {speed}",
    },
    progress.Presets.shades_classic
  );
  // let url = `https://www.gutenberg.org/files/1342/1342-0.txt`;
  let url = `${readFileOperate(fileOperationType.requestUrl)}?host=${hostStr}`
  https.get(url, (res) => {
    const buffList: any[] = [];
    console.log(chalk.green(`下载链接${url}`));
    console.log(chalk.green(`开始下载${hostStr}文件`));
    // 获取下载的总长度
    let total = Number(res.headers["content-length"]);
    let schedule = 0;
    progressBar.start(total, 0);
    // 数据回流
    res
      .on("data", (chunk) => {
        // 下载文件流放入buffList中去
        buffList.push(chunk);
        schedule += chunk.length;
        const kbps = (speed(schedule) / 1024).toFixed(2); // 计算下载速度，单位为kbps
        progressBar.update(schedule, { speed: `${kbps}kb/s` });
      })
      .on("error", (error) => {
        console.error(chalk.red(`下载出错：${error}`));
      })
      .on("end", () => {
        progressBar.stop();
        console.log(chalk.green("下载完成"));
        console.log(chalk.green("开始写入文件"));
        const buff = concatBuff(buffList, total);
        const filePath = setPathName(fileWritePath + `/${hostStr}`);
        console.log(chalk.green("写入路径", filePath));
        try {
          fs.writeFileSync(filePath, buff);
          console.log(chalk.green("写入完成"));
        } catch (error) {
          console.log(chalk.green("文件写入失败！", error));
          process.exit(1); // 退出并返回一个非零退出码
        }
      });
  });
};
