# 实例相关

## 实例的处理器核心与内存是如何分配的？

实例的处理器核心与内存是根据租用显卡与机器总显卡的占比计算的。以租用 64 核、512 GB、8 张显卡的机器为例。如果只租用了 1 张显卡，则处理器分配 64 / 8 = 8 核，内存限制为 512 / 8 = 64 GB。`free` 命令查看的是机器总内存，与实例内存限制无关，如果进程使用超过内存限制则会被强行停止。

## 如果你需要的镜像，官方没有，该怎么办？

一些常用的库和软件都可以通过命令安装，在 [常用命令](/docs/getting-started/command) 中提供了安装软件的方式。也可以使用 `conda` 命令创建虚拟环境，然后在虚拟环境中安装。在 [conda](/docs/best_practices/conda/) 中提供了 `conda` 的使用，如安装 PyTorch 1.7 `conda install pytorch==1.7.0 torchvision==0.8.0 torchaudio==0.7.0 -c pytorch`。

## 训练期间因网络抖动中断，怎样将训练任务放到后台运行？

推荐使用 `Tmux` 终端复用器，能够将进程放到后台运行，需要时重新接管。为了防止 SSH 因网络断开造成的进程运行中断，推荐把所有需要长期运行的训练等任务都使用 Tmux 终端。参考 [Tmux](/docs/best_practices/tmux) 文档。

## 关闭本地电脑，训练任务会中断吗？

- 如果是通过 Tmux 将任务放在后台运行，或使用 JupyterLab 浏览器运行的任务。关闭本地电脑不会中断训练。
- 如果是直接在终端中执行训练，或使用 VSCode 等 IDE 连接执行训练，则关闭电脑会中断训练。

## 关闭 JupyterLab 浏览器，训练任务会中断吗？

关闭 JupyterLab 的浏览器页面，只要实例不关闭。JupyterLab 中 NoteBook 和终端中的训练任务会继续运行。

## 关闭 VSCode、PyCharm、iTerm2 等 IDE 或终端，训练任务会中断吗？

使用 IDE 连接到实例执行训练任务，如果关闭 IDE 或终端会中断训练任务。如果需要后台运行推荐使用 Tmux 终端。参考 [Tmux](/docs/best_practices/tmux) 文档。

## 执行命令或程序报找不到包，如何安装？

参考 [常用命令](/docs/getting-started/command)，使用 `apt` 安装系统软件或 `pip` 安装 Python 包。

## 如何实现训练后自动关机？

实例终端中执行 `shutdown` 命令可以实现关机操作。训练代码结束后可以调用该命令实现训练完成后关机。

```python
import os
os.system('shutdown')
```

## 关机时提示磁盘空间已满，无法关机如何处理?

实例的根目录磁盘使用率可以通过下面的命令进行查看。如果满了需要删除一些文件释放空间，或把文件移动到 `/hy-nas`（仅有共享存储机型） 或 `/hy-tmp`（按量实例关机 24 小时会被清空）。磁盘满的情况下实例是无法正常启动的，所以要求在关机前必须释放一定的空间。

进入实例终端后通过下列命令可以查找占用空间的文件。或者进入控制台中的实例列表，点击实例中 **系统磁盘** 下的 **管理** 按钮，在打开的面板中可以删除实例内的文件。

```shell
# 查看实例根目录磁盘使用率
df -h | grep "/$" | awk '{print $5" "$3"/"$2}'

# 查看 /root 和 /home 目录下面每个目录的大小
du -h --max-depth=1 /root /home

# 查看当前目录下每个目录的大小
du -h --max-depth=1 .

# 查看当前目录下每个文件的大小
ll -h | grep ^- | awk '{print $5"\t"$9}'
```

## 在 RTX 3000 系列显卡上开始训练会卡住？

查看库所使用的 CUDA 版本是否低于 11.0。RTX 3000 系列显卡最低要求 CUDA 11 及以上的版本，使用低于 11 的版本会造成进程卡住。

## CUDA、CUDNN 版本是多少？ { #cuda-version }

使用 `nvidia-smi` 所查看到的 `CUDA Version` 为当前驱动支持的版本，不代表实例已安装的版本。具体版本以创建实例时选择的官方镜像版本的为准。

```
# 查看 CUDA 版本
root@I15b96311d0280127d:~# nvcc -V
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2021 NVIDIA Corporation
Built on Sun_Feb_14_21:12:58_PST_2021
Cuda compilation tools, release 11.2, V11.2.152
Build cuda_11.2.r11.2/compiler.29618528_0

# 查看 CUDNN 版本
root@I15b96311d0280127d:~# dpkg -l | grep libcudnn | awk '{print $2}'
libcudnn8
libcudnn8-dev

# 查看 CUDNN 位置
root@I15b96311d0280127d:~# dpkg -L libcudnn8 | grep so
/usr/lib/x86_64-linux-gnu/libcudnn.so.8.1.1
...
```

## 如何看显卡占用的情况？

通过终端执行 `nvidia-smi` 命令可以查看显卡的情况，可以查看显卡功耗、显存占用等情况。

```
root@I15b96311d0280127d:~# nvidia-smi
Mon Jan 11 13:42:18 2021
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 460.27.04    Driver Version: 460.27.04    CUDA Version: 11.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  GeForce RTX 3090    On   | 00000000:02:00.0 Off |                  N/A |
| 63%   55C    P2   298W / 370W |  23997MiB / 24268MiB |     62%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
+-----------------------------------------------------------------------------
```

因为实例均为 Docker 容器，因容器 PID 隔离的限制使用 `nvidia-smi` 会看不到进程。在终端中执行 `py3smi` 命令可以查看到是否有进程正在使用显卡。

```
root@I15b96311d0280127d:~# py3smi
Mon Jan 11 13:43:00 2021
+-----------------------------------------------------------------------------+
| NVIDIA-SMI                        Driver Version: 460.27.04                 |
+---------------------------------+---------------------+---------------------+
| GPU Fan  Temp Perf Pwr:Usage/Cap|        Memory-Usage | GPU-Util Compute M. |
+=================================+=====================+=====================+
|   0 63%   55C    2  284W / 370W | 23997MiB / 24268MiB |      80%    Default |
+---------------------------------+---------------------+---------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
| GPU        Owner      PID      Uptime  Process Name                   Usage |
+=============================================================================+
|   0          ???    10494                                          23995MiB |
+-----------------------------------------------------------------------------+
```

## 训练时 GPU 利用率上不去？

在训练过程中查看显卡的使用率，发现核心利用率和显卡功耗低，没有完全利用显卡。这种情况有可能是每一次训练的步骤中，除了使用 GPU 外，还有大部分时间消耗在了 CPU。造成了 GPU 利用率成周期变化。解决利用率的问题需要改进代码，可以参考夕小瑶的 [训练效率低？GPU利用率上不去？](https://zhuanlan.zhihu.com/p/53345706){target="_blank"} 的这篇文章。

## 如何加速从 GitHub 上克隆代码或下载文件？

加速克隆代码可以将 `github.com` 替换为 `github.com.cnpmjs.org` 的镜像地址。如仓库地址为 `https://github.com/kelseyhightower/nocode.git`，替换后的地址为 `https://github.com.cnpmjs.org/kelseyhightower/nocode.git`。

```bash
# 原始地址 https://github.com/kelseyhightower/nocode.git
# github.com 替换为 github.com.cnpmjs.org
git clone https://github.com.cnpmjs.org/kelseyhightower/nocode.git
```

下载 GitHub 的 Releases、Raw 文件可以使用 [GitHub Proxy](https://ghproxy.com){target="_blank"} 服务。在完整地址前加前缀 `https://mirror.ghproxy.com/`。

```bash
# 原始地址 https://raw.githubusercontent.com/kelseyhightower/nocode/master/README.md
# 地址加前缀 https://mirror.ghproxy.com/
curl -L https://mirror.ghproxy.com/https://raw.githubusercontent.com/kelseyhightower/nocode/master/README.md
```

因为机器的地域差异，不同镜像地址的效果可能不同。如果下载速度仍然不满意可以再测试如下两个：

- [FastGit](https://doc.fastgit.org/zh-cn/guide.html){target="_blank"}
- [GitClone](https://gitclone.com){target="_blank"}

## TensorFlow 训练报 `ptxas fatal` 错误

当在 RTX 3000 系列显卡上使用 TensorFlow 2.4 For CUDA 11.0 时，训练会出现下列警告。

`W tensorflow/stream_executor/gpu/asm_compiler.cc:235] Your CUDA software stack is old. We fallback to the NVIDIA driver for some compilation. Update your CUDA version to get the best performance. The ptxas error was: ptxas fatal   : Value 'sm_86' is not defined for option 'gpu-name'`

原因是该版本的 PTX compiler 不支持 8.6 compute capability。此报错为警告，不影响正常训练。该警告可以通过 `os.environ['TF_CPP_MIN_LOG_LEVEL'] = "2"` 关闭。

此问题虽然不影响训练但性能上会降低，推荐创建 TensorFlow 2.5 For CUDA 11.2 的镜像，不会存在此问题。

## 应用如何对外暴露端口服务？

实例并不提供公网 IP 地址，服务是通过端口映射到公网接入点提供链接的。需要时需要停止 JupyterLab 或 TensorBoard 服务，并且将应用端口配置成和 JupyterLab 或 TensorBoard 相同的 8888 或 6006 端口上，监听地址需要使用 0.0.0.0。

```bash
# 停止 JupyterLab 或 TensorBoard 服务
supervisorctl stop tensorboard
supervisorctl stop jupyterlab
# 设置开机不启动 JupyterLab 或 TensorBoard
grep -E "autostart" /etc/supervisor/conf.d/tensorboard.conf || echo "autostart = false" >>/etc/supervisor/conf.d/tensorboard.conf
grep -E "autostart" /etc/supervisor/conf.d/jupyterlab.conf || echo "autostart = false" >>/etc/supervisor/conf.d/jupyterlab.conf
# 更新配置
supervisorctl update
```

接下来将应用启动监听在 `0.0.0.0:6006` 或 `0.0.0.0:8888` 上。外部调用与访问是通过控制台实例中 JupyterLab 或 TensorBoard 工具链接。

## JupyterLab 要输入密码怎么办？ { #jupyterlab-password }

通过终端执行 `jupyter server list` 命令可以得到 JupyterLab 的登陆 Token。如下可以从执行结果内获得 Token 为 `3fq593blw4afqjtqgdp3ldk5`。

```
root@I15b96311d0280127d:~# jupyter server list
Currently running servers:
http://0.0.0.0:8888/?token=3fq593blw4afqjtqgdp3ldk5 :: /
```

## 运行中的实例重启失败怎么办？
建议点击操作栏中的关机，关机后，实例将停止计费，如有需要请联系客服进行处理。
![](https://gpucloud-static-public-prod.gpushare.com/docs/image/faq/instance/instance_01.png){ .img-fluid tag=1 }


## 如何获取实例SSH主机名、实例SSH端口号、实例密码？

打开[恒源云控制台](https://gpushare.com/center/hire){ target="\_blank" }，复制登录指令和密码，然后粘贴到文本或编辑器中。
![](https://gpucloud-static-public-prod.gpushare.com/docs/image/data/storage/storage_06.png){ .img-fluid tag=1 }

粘贴完成后如下所示：
```bash
登录指令：ssh -p 6666 root@i-1.gpushare.com
密码：vKExWbBWnVkszkwaFdh4cPABADSNFGuS

命令拆解如下：
实例SSH主机名：i-1.gpushare.com
实例SSH端口号：6666
实例用户名：root
实例密码：vKExWbBWnVkszkwaFdh4cXXXXXXXXXXX
```


## 如何更新Ubuntu apt源？
如果使用apt源下载东西很慢或者报错，则可以先通过`apt-get update -y`命令更新apt源对实例产生缓存，然后通过`apt-get install 包名`安装所需要的包。

执行如下命令即可完成替换。
```bash
curl -#OL "https://download.gpushare.com/download/update_source"
chmod u+x ./update_source
./update_source apt
```

举个例子：
```bash
~# curl -#OL "https://download.gpushare.com/download/update_source"
########################################################################## 100.0%
~# chmod u+x ./update_source
~# ./update_source apt
请输入0-8范围内的单个数字编号，来更新更新相应apt镜像源，输入后按回车确认
(0) 阿里云(aliyun)
(1) 中国科技大学(ustc)
(2) 网易(163)
(3) 清华大学(tsinghua)
(4) 浙江大学(zju)
(5) 腾讯云(tencent)
(6) 华为云(huawei)
(7) 北京外国语大学(bfsu)
(8) 官方源(ubuntu速度较慢)
0
Hit:1 https://mirrors.aliyun.com/ubuntu bionic InRelease
Hit:2 https://mirrors.aliyun.com/ubuntu bionic-updates InRelease
Hit:3 https://launchpad.proxy.ustclug.org/deadsnakes/ppa/ubuntu bionic InRelease
Hit:4 https://mirrors.aliyun.com/ubuntu bionic-security InRelease
Ign:5 https://developer.download.nvidia.cn/compute/cuda/repos/ubuntu1804/x86_64  InRelease
Hit:6 https://developer.download.nvidia.cn/compute/cuda/repos/ubuntu1804/x86_64  Release
Hit:7 https://mirrors.aliyun.com/ubuntu bionic-proposed InRelease
Hit:8 https://mirrors.aliyun.com/ubuntu bionic-backports InRelease
Reading package lists... Done

系统apt镜像源已更换为阿里云(aliyun)
```

## 如何更新conda源？
如果使用conda源安装库或者包总是很慢，可以更换为国内其它镜像源地址后进行下载。

执行如下命令即可完成替换。
```bash
curl -#OL "https://download.gpushare.com/download/update_source"
chmod u+x ./update_source
./update_source conda
```

举个例子：
```bash
~# curl -#OL "https://download.gpushare.com/download/update_source"
########################################################################## 100.0%
~# chmod u+x ./update_source
~# ./update_source conda
请输入0-8范围内的单个数字编号，来更新更新相应pip镜像源，输入后按回车确认
(0) 清华大学(tsinghua)
(1) 北京外国语大学(bfsu)
(2) 南京大学(nju)
(3) 南京邮电大学(njupt)
(4) 重庆邮电大学(cqupt)
(5) 哈尔滨工业大学(hit)
(6) 北京大学(pku)
(7) 南方科技大学(sustech)
(8) 官方源(anaconda速度较慢)
0

conda镜像源已更换为清华大学(tsinghua)
channels:
  - defaults
show_channel_urls: true
channel_alias: https://mirrors.tuna.tsinghua.edu.cn/anaconda
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```

## 如何更新pip镜像源？
如果Python的pip安装库或者包总是很慢，可以更换为国内其它镜像源地址后进行下载。

执行如下脚本即可完成更新pip镜像源。
```bash
curl -sOL "https://download.gpushare.com/download/update_source"
chmod u+x ./update_source
./update_source pip
```

举个例子：
```bash
~# curl -#OL "https://download.gpushare.com/download/update_source"
########################################################################## 100.0%
~# chmod u+x ./update_source
~# ./update_source pip
请输入0-10范围内的单个数字编号，来更新更新相应pip镜像源，输入后按回车确认
(0) 阿里云(aliyun)
(1) 中国科技大学(ustc)
(2) 豆瓣(douban)
(3) 清华大学(tsinghua)
(4) 腾讯云(tencent)
(5) 网易(163)
(6) 华为云(huawei)
(7) 北京外国语大学(bfsu)
(8) 南京大学(nju)
(9) 北京大学(pku)
(10) 官方源(pypi速度较慢)
6

pip镜像源已更换为华为云(huawei)
global.index-url='https://repo.huaweicloud.com/repository/pypi/simple'
global.timeout='3000'
global.trusted-host='repo.huaweicloud.com'
```

## 如何升级pip包管理工具？

```bash
#升级前查看pip版本
pip -V	#如下返回pip版本为21.0.1
pip 21.0.1 from /usr/local/lib/python3.8/dist-packages/pip (python 3.8)

#升级 pip 到最新的版本
pip install pip -U

#也可以临时使用指定镜像来升级 pip
pip install -i https://mirrors.cloud.tencent.com/pypi/simple --upgrade pip

#升级后查看pip版本
pip -V	#如下显示22.0.4
pip 22.0.4 from /usr/local/lib/python3.8/dist-packages/pip (python 3.8)
```

## JupyterLab打不开或者响应慢怎么办？
如果遇到JupyterLab页面响应特别缓慢或者打不开的情况，可登录实例后通过以下命令来重启JupyterLab

```bash
#官方Pytorch镜像
supervisord ctl restart jupyterlab

#官方非Pytorch镜像
supervisorctl restart jupyterlab
```

不建议通过JupyterLab页面直接运行较消耗资源的程序，因为该程序很可能会导致JupyterLab无响应或者运行缓慢问题，可通过tmux工具放置在实例后台运行。

## tensorboard打不开或者响应慢怎么办？
如果遇到tensorboard页面响应特别缓慢或者打不开的情况，可登录实例后通过以下命令来重启tensorboard

```bash
#官方Pytorch镜像
supervisord ctl restart tensorboard

#官方非Pytorch镜像
supervisorctl restart tensorboard
```

## 自定义镜像误删除 / 空间或者文件怎么办？
如果为自定义镜像，在操作实例过程中误删除了 / 空间或者某个数据文件，可通过恢复镜像功能来进行恢复。
![](https://gpucloud-static-public-prod.gpushare.com/docs/image/faq/instance/instance_02.png){ .img-fluid tag=1 }

## 自定义镜像如何安装jupyterlab？
自定义镜像登录实例后执行如下命令即可完成安装jupyterlab，安装完成后可通过控制台打开jupyterlab页面
```bash
curl -#OL "https://download.gpushare.com/download/custom_install"
chmod u+x ./custom_install
./custom_install jupyterlab
```

## 自定义镜像如何安装tensorboard？
自定义镜像登录实例后执行如下命令即可完成安装tensorboard，安装完成后可通过控制台打开tensorboard页面
```bash
curl -#OL "https://download.gpushare.com/download/custom_install"
chmod u+x ./custom_install
./custom_install tensorboard
```

## 如何避免数据丢失？

开启**checkpoint**可以来避免数据丢失。

通常在训练模型的过程中，偶尔可能会发生网络波动，显卡故障等问题；

如果在前台训练，一旦出现网络波动，前面训练将功亏一篑，又得重头开始训练，因此每间隔一段时间就将训练模型信息保存一次很有必要（开启checkpoint）。而这些信息不光包含模型的参数信息，还包含其他信息，如当前的迭代次数，优化器的参数等，以便用于后面恢复训练。

强烈建议通过tmux命令或者nohup命令将训练放到后台，这样可以避免网络波动所发生的问题，同时建议开启**checkpoint**，间隔时间保存训练结果，来确保显卡故障或偶尔问题导致训练数据丢失的风险。
