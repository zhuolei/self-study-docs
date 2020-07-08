# JVM

## JVM JDK JRE
- JVM (Java Virtual Machine), Java 虚拟机, 是Java平台无关性实现的关键(Java在不同平台运行是不需要重新编译成不同的目标代码)
  - Java 虚拟机解释执行编程过程中生成的字节码文件,实现一次编译到处运行
  - ![img](~@pic/img/jvm-1.png)
- JDK (Java Development Kit), Java语言的软件开发工具包, 有两个主要的组件
  - javac --编译器， 将源程序转成字节码
  - java --运行编译后得java程序(.class后缀)
- JRE(Java Runtime Environment)
  - 包括Java虚拟机（JVM）、Java核心类库和支持文件
  - 如果只需要运行Java程序，下载并安装JRE即可
  - 如果要开发Java软件，需要下载JDK。
  - ![img](~@pic/img/jvm-2.png)

## Java平台

- JavaSE Java标准版 主要开发桌面程序
- JavaEE Java企业版 主要开发Web程序后端