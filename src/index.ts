#!/usr/bin/env node
// 注意一定要有这行代码：#!/usr/bin/env node，这行代码叫shebang或者hashbang，它会告诉操作系统在运行这个文件文件的时候，需要用node的解析器来解析。
import { program } from "commander";
import { useHost } from "./core/use";
import { installHost } from "./core/install";
import { getHostList } from "./core/list";
import { isErrorHost } from "./utils";

// 切换环境变量
program.command("use <hostName>").description('应用的host类型，必须指明').action((host: string) => {
  isErrorHost(host) || useHost(host);
});
// 下载环境变量
program.command("install  <hostName>").description('下载的host类型，必须指明').action((host: string) => {
  isErrorHost(host) || installHost(host);
});
// 查看已经下载的所有环境变了
program.command('list').description('安装的所有host').action(() => {
    getHostList()
})
program.parse(process.argv);
