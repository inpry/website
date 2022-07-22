---
id: custom
title: 自定义服务
hide_title: true
hide_table_of_contents: false
sidebar_label: 自定义服务
sidebar_position: 3
pagination_label: Markdown features
custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: How do I find you when I cannot solve this problem
image: https://gpushare.com/docs/logo.png
slug: /custom.html
authors: jmarcey
---


自定义服务是平台提供的一个给用户暴露服务到公网访问的功能，可以暴露任何端口到公网进行访问，只需在启动需暴露服务时指定平台规定的**`8080`**端口即可。

示例中来展示自定义Visdom服务，然后通过自定义服务进行访问到Visdom的可视化界面。

1.首先登录Linux实例。

登录实例过程可以参考：**[登录Linux实例](/docs/getting-started/login_instance/){ target="\_blank" }**相关文章。

2.安装visdom可视化界面
```bash
~# pip install visdom
```

3.查看visdom帮助文档，通过选项来指定visdom启动时的端口

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="pip" label="pip" default>

```bash
~# pip install visdom
```

  </TabItem>
  <TabItem value="conda" label="conda">

```bash
~# conda install visdom
```
  </TabItem>

  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>

```bash title="bash"
~# visdom --help
Checking for scripts.
usage: visdom [-h] [-port port] [--hostname hostname] [-base_url base_url] [-env_path env_path] [-logging_level logger_level] [-readonly]
              [-enable_login] [-force_new_cookie] [-use_frontend_client_polling]

Start the visdom server.

optional arguments:
  -h, --help            show this help message and exit
  -port port            port to run the server on.          #通过-port或port选项来指定visdom启动端口
  --hostname hostname   host to run the server on.
  -base_url base_url    base url for server (default = /).
  -env_path env_path    path to serialized session to reload.
  -logging_level logger_level
                        logging level (default = INFO). Can take logging level name or int (example: 20)
  -readonly             start in readonly mode
  -enable_login         start the server with authentication
  -force_new_cookie     start the server with the new cookie, available when -enable_login provided
  -use_frontend_client_polling
                        Have the frontend communicate via polling rather than over websockets.
```

4.通过-port选项来指定端口启动visdom
```bash
~# visdom -port 8080
Checking for scripts.
It's Alive!
INFO:root:Application Started
You can navigate to http://localhost:8080
```

以上打印 "It's Alive!"表示visdom启动完成，不同服务打印内容不同。

!!! tip "后台启动"
    上述默认为前台启动visdom服务，可以通过**[tmux](/docs/best_practices/tmux/){ target="\_blank" }**命令托管或通过nohup等命令来将visdom放置后台启动，放置后台启动不用担心终端断开而导致visdom服务中断问题。


5.访问visdom可视化界面
通过控制台**[我的实例](/center/hire){ target="\_blank" }**中的【自定义服务】来访问visdom。

![](https://gpucloud-static-public-prod.gpushare.com/docs/image/best_practices/custom/custom_01.png){ .img-fluid tag=1 }

点击后跳转到visdom可视化界面
![](https://gpucloud-static-public-prod.gpushare.com/docs/image/best_practices/custom/custom_02.png){ .img-fluid tag=1 }

!!! tip "指定启动端口"
    不同的服务所指定的`8080`端口启动的方式并不完全一致，如果使用类似visdom开源工具，一般则可以通过所指定的 `程序命令(类似visdom) --help` 进行查看帮助手册，来获取指定端口选项。其它工具则可以通过修改该工具配置文件中相应的监听端口来实现修改。
    

