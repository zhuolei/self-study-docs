# Intro

## JVM, JRE, JDK

- JVM is an acronym for Java Virtual Machine, it is an abstract machine which provides the runtime environment in which java bytecode can be executed.
- JVMs are available for many hardware and software platforms (so JVM is platform dependent).
- JRE stands for Java Runtime Environment. It is the implementation of JVM and physically exists.
- JDK is an acronym for Java Development Kit. It physically exists. It contains JRE + development tools.

## Install

### Mac

如果出现命令找不到的情况，有可能是你没有配置环境变量

:::tip
Mac里右击时hold option键copy会变成copy path
:::

```shell
// 输出当前环境变量
echo $PATH   // /opt/anaconda3/bin:/opt/anaconda3/condabin:/Users/zhuoleidong/.nvm/versions/node/v12.14.1/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

// 对于bash
open ~/.bash_profile // or vi 编辑

// 对于zsh
open ~/.zshrc

//在zshrc文件里加上路径
// 有的时候有的程序需要JAVA_HOME变量
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.6.jdk/Contents/Home 
PATH=$JAVA_HOME/bin:$PATH //用冒号隔开把path原来的值也加进来

// 用export让名字生效
export JAVA_HOME 
export PATH
```

如果想让zshrc文件立即生效需要使用`source .zshrc`
