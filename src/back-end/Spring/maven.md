# Maven And Gradle

## Maven Intro

- Maven是项目管理工具，对软件项目提供构建与依赖管理
- Maven是Apache下的Java开源项目
- Maven为Java项目提供了统一的管理方式，业界标准

## 安装

### Mac

#### 用brew
```shell
brew install maven or brew upgrade maven
```

注意brew下载会自动应用openjdk档子
:::tip
Maven uses the JAVA_HOME parameter to find which Java version it is supposed to run. I see from your comment that you can't change that in the configuration.

You can set the JAVA_HOME parameter just before you start maven (and change it back afterwards if need be).
:::

#### 直接下载
直接去https://maven.apache.org/download.cgi?Preferred=ftp://ftp.osuosl.org/pub/apache/ 下载，然后解压到任意一个文件夹
然后在bash_profile 或者zshrc 文档里加上

```shell
export M2_HOME=/Users/leo/apache-maven-3.6.3
export PATH=$PATH:$M2_HOME/bin
```
然后在terminal运行`source ~/.zshrc`