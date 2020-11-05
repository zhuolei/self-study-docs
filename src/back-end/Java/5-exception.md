# Exception

## 异常分类
- 编译异常
  - 括号没有正常配对
  - 语句结束少写了分号
  - 关键字编写错误
- 运行异常
  ![img](~@pic/img/java-exception-1.png)

Throwable 是Java中重要的根类 包含Error和Exception
- Error表示程序无法处理的错误，表示运行应用程序中较严重问题。（大多数的Error错误与代码编写者是没有关系的，而表示代码运行时Java虚拟机出现的一系列的问题）
常见的 
  - Error错误：虚拟机错误（VritualMachineError）/内存溢出（OutOfMemoryError）/线程锁死（ThreadDeath。
  - Error不可查，不需要去try catch捕捉。 对于设计合理的应用程序来说，及时确实发生了错误，本质上不应该试图去处理它所引起的异常状况。（所以对于Error及其子类产生的异常我们通常是不需要关心的）
- Exception是程序本身可以处理的异常，异常处理通常指的就是针对这种类型异常，及其子类的处理。包括
  - Checked Exception（检查异常）-->**编译器要求必须在代码编写过程中处理这些异常，否则编译代码无法正常通过。**
常见的检查异常：IO异常，IOException（文件操作异常）、SQL异常，SQLException（数据操作异常）
  - Unchecked Exception（非检查异常）-->**编译器不要求强制处理的异常** 包括：RuntimeException及其相关子类（空指针异常（NullPointerException）/数组下标越界异常（ArrayIndexOutOfBoundsException）/算数异常（ArithmetException）/类型转换异常ClassCastException）java编译器在编译阶段是不会检查这些异常的，也就是在代码编写阶段是可以捕获这些异常的，也可以放任不管。（编译器对这些异常不会产生任何解释信息）

![img](~@pic/img/java-exception-2.png)

## Java 异常处理机制

java异常处理机制通常分为两大部分

1. 抛出异常-->当一个方法中出现一个错误引发的异常的时候，方法会创建异常对象，并交付运行时系统进行处理。
异常对象通常包括：异常类型、异常出现时程序的状态
2. 捕获异常-->当运行时系统捕获过了这个异常，就进入 捕获异常 环节。这个阶段运行时系统会寻找合适的处理器，如果找到相关处理器，则执行相关的处理逻辑。如果始终没有找到，那么运行时系统将会终止。也就意味着Java程序终止了。

**Java规定：**

- 对于可查异常必须捕获、或者声明抛出
- 对于，RuntimeException（含子类）和Error(含子类) 允许忽略不可查

针对 抛出异常和捕获异常 java是通过5个关键字来实现的：`try/catch/finally/throw/throws`

![img](~@pic/img/java-exception-3.png)

:::tip
try块后可接零个或多个catch块，如果没有catch块，则必须跟一个finally块。
:::

### 空指针异常(java.lang.NullPointException)?

没有创建对象而去直接使用它
- 空：内存地址为空
- 指针：引用
- 异常：为运行时异常

```java
package com.imooc.java.escape;

/**
* 理解什么是空指针
*/
public class WhatIsNpe {

  public static class User {

    private String name;
    private String[] address;

    public void print() {
      System.out.println("This is a class!");
    }

    public void readBook() {
      System.out.println("User Read Imooc Escape!");
      return null;
    }
  }
  /**
  *自定义一个异常
  **/
  public static class CustomException extends RuntimeException {}

  public static void main(String[] args) {

    //第一种情况：调用了空对象的实例方法
    User user = null;
    user.print(); // will throw nullPointerException

    //第二种访问了空对象的属性
    User user = null;
    user.name

    //第三种情况当数组为一个空对象，取他的长度;
    User user = new User();
    System.out.println(user.address.length)
  }
}
```