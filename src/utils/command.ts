import { program } from "commander";
import chalk from "chalk";

export const commandFn = (
  command: string,
  description: string,
  actionFn: Function
) => {
  program
    .exitOverride((err) => {
      if (
        err instanceof Error &&
        err.message.length != 0 &&
        err.code != "commander.helpDisplayed"
      ) {
        console.error(chalk.red(`无效的命令`));
        console.error(chalk.red("输入 -h 或 --help 查看命令帮助信息。")); // 输出自定义的错误信息window
      }
      process.exit(1); // 设置退出码为 1
    })
    .command(command)
    .description(description)
    .action((...args: any[]) => {
      actionFn(args);
    });
};
