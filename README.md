# 项目汇总：(ch-host)

# 使用命令
* ch-host list 列出本地下载的所有host文件
* ch-host install test 下载test host文件
* ch-host use test  应用的test host类型
* ch-host seturl <hostName> <requestUrl> 为每个host设置URL的接，如果没有设置则其他命令都不可用
* ch-host geturls  获取当前已经设置的host请求的所有URL
* hostName限制：限制命令只能输入 "test", "staging", "prod", "old-bak", "dev"
* URL规则 如：https://www.gutenberg.org/files/1342/1342-0.txt?host=test 其中test未输入的几个hostName

## 一、命令使用说明

> ### 1.1、npm link
  * 此命令用于在本地开发过程中创建全局软链接，将本地的包链接到全局 node_modules 目录中，以便可以在其他项目中使用。
  * 使用 npm link 的步骤如下：

    1、进入要链接的本地包的根目录。

    2、在该目录下执行 npm link 命令，将本地包链接到全局。

    3、进入要使用本地包的项目的根目录。

    4、执行 npm link package-name 命令，将全局的本地包链接到当前项目的 node_modules 目录中。
    ```shell
    cd /path/to/local-package
    npm link
    cd /path/to/project
    npm link package-name
    ```
> ### 1.2、npm ls -g --depth=0
  * 查看已经链接的所有包名 
  * 该命令会列出全局已链接的包的名称和版本号。使用 -g 选项指定全局范围，--depth=0 选项用于限制显示的深度，仅显示顶级包

> ### 1.3、npm root -g
  * 该命令将输出全局安装包的文件夹路径，这也是通过 npm link 链接的文件夹路径。

  
## 二、项目注意点
> ### 1.1、#!/usr/bin/env node
  *  注意一定要有这行代码：#!/usr/bin/env node，这行代码叫shebang或者hashbang，它会告诉操作系统在运行这个文件文件的时候，需要用node的解析器来解析。
  
> ### 1.2、chomd +x main.js
  * 如果运行命令，得到一个报错的话，需要给这个文件添加一个执行的权限。（没有就不需要）
  
> ### 1.3、commander模块
  * commander 是一个用于构建命令行应用的 Node.js 模块，它提供了一种简洁而直观的方式来定义命令行界面和解析命令行参数。它可以帮助你轻松地创建自定义命令、选项和子命令，并处理用户输入。
  
> ### 1.4、child_process模块
  * 在 Node.js 中，child_process 模块用于创建子进程，以便在 Node.js 应用程序中执行外部命令或脚本。它提供了一组 API，允许你与子进程进行交互、执行命令并处理子进程的输出。
  * 使用 npm link 的步骤如下：
  
    1、child_process 模块提供了几个不同的方法来创建子进程，包括：

    2、spawn()：用于异步地启动一个新的子进程，可以执行任意命令。
    *  child_process 模块的 spawn 方法来执行 shell 脚本，并使用 stdio: 'inherit' 选项将子进程的输入和输出流连接到父进程，以便可以与用户进行交互。
    *  spawn 函数来启动子进程并执行 Shell 脚本。这样可以实现非阻塞的执行，并可以处理脚本中的输入和输出。

    3、exec()：用于执行一个命令，并获取其输出。它使用系统的默认 shell 来执行命令。

    4、execFile()：类似于 exec()，但直接执行可执行文件，而不使用系统的默认 shell。

    5、fork()：用于创建一个新的 Node.js 子进程，并在该子进程中执行指定的模块文件。

    ```shell
      const { exec } = require('child_process');

      exec('ls -l', (error, stdout, stderr) => {
      if (error) {
          console.error(`执行命令时出错: ${error.message}`);
          return;
      }
      if (stderr) {
          console.error(`命令输出错误: ${stderr}`);
          return;
      }
      console.log(`命令输出结果:\n${stdout}`);
      })
    ```
  * sh脚本中如何 确定当前目录， 并且在执行脚本的时候 能够找到当前脚本文件夹sh下的文件 
  
    ```shell
      #!/bin/bash
      # 确定当前目录
      currentDir=$(pwd)
      echo "当前目录: $currentDir"
      # 确定当前脚本文件夹下的文件
      scriptDir=$(dirname "$0")
      echo "当前脚本文件夹: $scriptDir"
      # 执行其他操作...
    ```

> ### 1.4、 #!/usr/bin/env node  作用：
  * 当你在使用 tsup 打包时，如果你打算将输出的文件作为一个可执行脚本来运行，那么在文件的开头加上 #!/usr/bin/env node 是必要的。

  * 这是因为 #!/usr/bin/env node 是一个 ``shebang``（也称为 ``hashbang``）注释行，它告诉系统该脚本应该使用哪个解释器来执行。在这种情况下，/usr/bin/env 是一个可执行文件，它会在环境变量 ``$PATH`` 中查找后面指定的解释器，在这里指定的解释器是 node。

  * 如果你不在文件开头添加 shebang 注释行，操作系统就无法确定使用哪个解释器来执行该文件，从而导致类似 ``"syntax error near unexpected token" ``的错误。
  
  * 为了确保你的 TypeScript/JavaScript 脚本能够正确执行，你需要在文件开头添加以下 shebang 注释行：
    ```shell
      #!/usr/bin/env node
    ```
  * 这样，在你通过命令行运行该文件时，操作系统就会根据该注释行来选择正确的解释器，并执行相应的脚本代码。`请注意，添加 shebang 注释行只适用于将输出的文件作为可执行脚本运行的情况`。如果你将输出的文件用作库或模块，或者在浏览器环境中使用，那么不需要添加 shebang 注释行。