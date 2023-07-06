# 使用说明：
## 1、chh 安装
* npm install ch-host  -g

## 2、使用命令
* chh list 列出本地下载的所有host文件
* chh install test 下载test host文件
* chh use test  应用的test host类型
* chh seturl <hostName> <requestUrl> 为每个host设置URL的接，如果没有设置则其他命令都不可用
* chh geturls  获取当前已经设置的host请求的所有URL
* hostName限制：限制命令只能输入 "test", "staging", "prod", "old-bak", "dev"
* URL规则 如：https://www.gutenberg.org/files/1342/1342-0.txt?host=test 其中test未输入的几个hostName