# OCP, IOC, Bean

## intro
面向对象编程存在两个步骤：
- 实例化对象
- 调用方法实现业务逻辑

## 开闭原则 Open Closed Principle (OCP)

1. 只有一段代码中没有new的出现，才能保持代码的相对稳定，才能逐步实现OCP.（如果一段代码要保持稳定，就不应该负责对象的实例化）
2. 对象的实例化是不能消除的。
3. 把对象的实例化的过程，放在其他的代码片段
4. 代码中总是存在不稳定，需要隔离这种不稳定，保证其他的代码是稳定的(IOC)
5. 变化（用户操作，业务需求变化）是导致代码不稳定的本质原因
6. 配置文件的变化是允许的，并不影响OCP 因为配置文件属于外部文件 类似用户输入

### 什么是开闭原则 如何实现

Softeware entities like classes,modules and functions should be open for extension but closed for modifications.
开闭原则的含义是说一个软件实体应该通过扩展来实现变化，而不是通过修改已有代码来实现变化。

软件实体包括以下几个部分：

- 项目或软件产品中按照一定的逻辑规则划分的模块
- 抽象和类
- 方法

开闭原则是为软件实体的未来事物而制定的对现行开发设计进行约束的一个原则。

:::warning
注意：开闭原则对扩展开放，对修改关闭，并不意味着不做任何修改，低层模块的变更，必然要有高层模块进行耦合，否则就是一个孤立无意义的代码片段了。
:::

变化的类型：

- 逻辑变化
- 子模块变化
- 可见试图变化
一个项目的基本路径应该是这样的：项目开发、重构、测试、投产、运维，其中的重构可以对原有的设计和代码进行修改，运维尽量减少对原有代码修改，保持历史代码的纯洁性，提高系统的稳定性。

### 开闭原则重要性

- 开闭原则对测试的影响:
  开闭原则可是保持原有的测试代码仍然能够正常运行，我们只需要对扩展的代码进行测试就可以了。

- 开闭原则可以提高复用性:
  在面向对象的设计中，所有的逻辑都是从原子逻辑组合而来的，而不是在一个类中独立实现一个业务逻辑。只有这样代码才可以复用，粒度越小，被复用的可能性就越大。

- 开闭原则可以提高可维护性:
  面向对象开发的要求

### 单纯interface可以统一方法调用，但无法统一实例化

**example:**
一个LOL的例子用interface创建各种英雄

```Java
public interface ISkill {
  void q();
  void w();
  void e();
  void r();
}

public class Camile implements ISkill {
  public void q() { System.out.println("Camile Q"); }
  public void w() { System.out.println("Camile W"); }
  public void e() { System.out.println("Camile E"); }
  public void r() { System.out.println("Camile R"); }
}

public class Diana implements ISkill {...}

public class Main {
  // psvm
  public static void main(String[] args) throws Exception {
    String name = Main.getPlayerName();
    //注意因为用了interface所以不用Camile class来创建对象
    ISkill iSkill;
    // 这里switch没有被消除所以代码还可以精简
    // 单纯interface但无法统一实例化
    switch(name) {
      case "Camile":
        iSkill = new Camile();
        break;
      case "Diana":
        iSkill = new Diana();
        break;
      default:
        throw new Exception()
    }
    // throw new Exception() 加了异常 调用r的时候才不会报错因为iSkill没有初始值：
    // 统一方法调用
    iSkill.r();
  }

  private static String getPlayerName() {
    System.out.println("Enter a Hero's Name:")
    Scanner scanner = new Scanner(System.in);
    return scanner.nextLine();
  }
}
```

所以我们可以得出结论
:::warning
抽象的难点在于new 对象
:::

### 工厂模式分离对象实例化

:::tip
思考为什么工厂用静态方法
为什么工厂里面的代码还是需要更改，当新英雄出现
:::

```java
public interface ISkill {...}

public class Camile implements ISkill {...}

public class Diana implements ISkill {...}

public class HeroFactory {
  public static ISkill getHero(String name) throws Exception {
    ISkill iSkill;
    switch(name) {
      case "Camile":
        iSkill = new Camile();
        break;
      case "Diana":
        iSkill = new Diana();
        break;
      default:
        throw new Exception()
    }
    return iSkill;
  }
}

public class Main {
  // 这里对于main方法就实现了ocp原则
  public static void main(String[] args) throws Exception {
    String name = Main.getPlayerName();
    ISkill iSkill = HeroFactory.getHero(name);
    iSkill.r();
    // spring ioc
    // ApplicationContext == HeroFactory
    // ApplicationContext ctx = new ClassPathXmlApplicationContext(xml)l
    // ctx.getBean("")
  }
  private static String getPlayerName() {...}
}
```

### 通过反射机制消除所有的变化

```java
public interface ISkill {...}

public class Camile implements ISkill {...}

public class Diana implements ISkill {...}

// 把英雄类放在reflect.hero包下
public class HeroFactory {
  public static ISkill getHero(String name) throws Exception {
    ISkill iSkill;
    // 反射 动态创建对象
    // 元类
    // 类是对象的抽象
    String classStr = "reflect.hero" + name;
    Class <?> class = Class.forName(classStr);
    Object obj = class.newInstnace();
    // clazz.getDeclaredConstructor().newInstance(); after JDK 8
    return (ISkill)obj;
  }
}

public class Main {...}
```

:::warning
反射性能低
:::

## IOC DI DIP(工厂模式 + 反射并不是IOC和DI)

### IOC 

IoC控制反转，全称inverse of Controll 是一种设计理念
**以前是我们向工厂要一个对象，现在是IOC直接给我们**

:::tip
思考:工厂模式和IOC的区别
:::

### IOC 示例

```java
public class IC {
  public void print() {
    System.out.println("ic");
  }
}

public class A {
  private IC ic;

  public void print() {
    // 容器直接给我们对象
    // 体现的是依赖注入
    this.ic.print()
  }
}
```

### DIP (Dependency Inversion Principle) 依赖倒置

High level modules should not depend upon low level modules. Both should depend upon abstractions. Abstractions should not depend upon details. Details should depend upon abstractions。

高层模块不应该依赖低层模块，两者都应该依赖其抽象；抽象不应该依赖细节，细节应该依赖抽象。

#### 原理解释

1）高层（高层是抽象）模块不应该直接依赖于底层模块的具体实现，而应该依赖于底层的抽象。换言之，模块间的依赖是通过抽象发生，实现类之间不发生直接的依赖关系，其依赖关系是通过接口或抽象类产生的。

2）接口和抽象类不应该依赖于实现类，而实现类依赖接口或抽象类。这一点其实不用多说，很好理解，“面向接口编程”思想正是这点的最好体现。

### DI (Dependency Injection) 依赖注入

1. 属性注入
2. 构造注入

```java
```java
public class IC {
  public void print() {
    System.out.println("ic");
  }
}

public class A {
  private IC ic;

  // 构造注入
  public A (IC ic) {
    this.ic = ic;
  }

  public void print() {
    // 容器直接给我们对象
    // 体现的是依赖注入
    this.ic.print()
  }
  // 属性注入
  public void setIc(IC ic) {
    this.ic = ic;
  }
}
```
```