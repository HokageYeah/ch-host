import chalk from "chalk";
import { fileOperationType, readFileOperate, saveFileOperate } from "../utils";

export const setRequestUrl = (host: string, requestUrl: string) => {
  // 尝试从文件中读取键值对对象
  let urlMap;
  try {
    const jsonString = readFileOperate(fileOperationType.requestUrl);
    urlMap = JSON.parse(jsonString);
  } catch (err) {
    urlMap = {}; // 如果文件不存在或格式不正确，则创建一个空对象
    // console.error(chalk.red('文件格式不正确，请重新设置'));
  }
  // 更新键值对对象
  urlMap[host] = requestUrl;
  // 将对象序列化为 JSON 字符串
  const jsonString = JSON.stringify(urlMap);
  const getUrlJson = saveFileOperate(jsonString, fileOperationType.requestUrl);
};

export const getRequestUrl = () => {
  let urlMap;
  try {
    const jsonString = readFileOperate(fileOperationType.requestUrl);
    urlMap = JSON.parse(jsonString);
  } catch (err) {
    console.error(chalk.red("读取 URL 失败:", err));
    process.exit(1); // 设置退出码为 1
  }
  // 遍历键值对列表，拼接成字符串并打印到控制台
  const urls = [];
  for (const [hostName, requestUrl] of Object.entries(urlMap)) {
    urls.push(`${hostName}: ${requestUrl}`);
  }
  console.log(chalk.green(urls.join('\n')));
};
