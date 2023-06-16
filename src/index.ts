#!/usr/bin/env node
//  注意一定要有这行代码：#!/usr/bin/env node，这行代码叫shebang或者hashbang，它会告诉操作系统在运行这个文件文件的时候，需要用node的解析器来解析。
import { useHost } from "./core/use";
import { installHost } from "./core/install";
import { getHostList } from "./core/list";
import { isErrorHost, isNoSetRequestUrl, isValidUrl } from "./utils";
import { getRequestUrl, setRequestUrl } from "./core/setUrl";
import { program } from "commander";
import { commandFn } from "./utils/command";

// 切换环境变量
commandFn("use <hostName>", "应用的host类型，必须指明", (host: string) => {
  isNoSetRequestUrl() || isErrorHost(host) || useHost(host);
});
// 下载环境变量
commandFn("install  <hostName>", "下载的host类型，必须指明", (host: string) => {
  isNoSetRequestUrl() || isErrorHost(host) || installHost(host);
});
// 查看已经下载的所有环境变了
commandFn("list", "安装的所有host", (host: string) => {
  isNoSetRequestUrl() || getHostList();
});

// 设置请求host的链接，如果没有设置则其他命令都不可用
commandFn(
  "seturl  <requestUrl>",
  "设置请求host的链接，如果没有设置则其他命令都不可用",
  (requestUrl: string) => {
    isValidUrl(requestUrl) || setRequestUrl(requestUrl);
  }
);

commandFn("geturl", "获取当前已经设置的host请求的URL", (requestUrl: string) => {
  isNoSetRequestUrl() || getRequestUrl();
});
program.parse(process.argv);
