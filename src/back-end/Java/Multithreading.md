# Multithreading

## 1. Java 如何编写多线程

### 1.1 Java 实现多线程的方式

在 java 中实现多线程有四种方式，如下：

- 继承 Thread 类
- 实现 Runnable 接口
- 使用 FutureTask
- 使用 Executor 框架

其中继承 Thread 类和实现 Runnable 接口是最基本的方式，但有一个共同的缺点 ---- 没有返回值。而 FutureTask 则解决了这个问题。 Executor 是 JDK 提供的多线程框架

#### 例子

小明是一位学生，今天不太开心。因为昨天英语课学习了一个新的单词，今天考试时他写错了。老师惩罚他抄写 100 遍。这个单词有点长，是什么单词呢？internationalization。看着眼熟吗？做过国际化开发的同学一定认识，这个单词因为太长，在 java 中被称为 i18n，也就是首字母 i 和尾字母 n 之间有 18 个字母。小明很苦恼，怎么能快点写完呢？

### 1.2 单线程实现单词抄写

OK，下面我们通过程序来模拟小明抄写单词的任务。我们编写如下几个类：

1、Punishment.java

存储要抄写的单词，以及剩余的抄写次数。主要代码如下：

```java
public class Punishment {
    private int leftCopyCount;
    private String wordToCopy;
}
```

2、Student.java

持有 Punishment 的引用。实现了抄写单词的 copyWord 方法。主要代码如下：

```java
public class Student {
    private String name;
    private Punishment punishment;

    public Student(String name,Punishment punishment) {
        this.name=name;
        this.punishment = punishment;
    }

    public void copyWord() {
        int count = 0;
        String threadName = Thread.currentThread().getName();

        while (true) {
            if (punishment.getLeftCopyCount() > 0) {
                int leftCopyCount = punishment.getLeftCopyCount();
                System.out.println(threadName+"线程-"+name + "抄写" + punishment.getWordToCopy() + "。还要抄写" + --leftCopyCount + "次");
                punishment.setLeftCopyCount(leftCopyCount);
                count++;
            } else {
                break;
            }
        }

        System.out.println(threadName+"线程-"+name + "一共抄写了" + count + "次！");
    }
}
```

Student 构造函数传入 Punishment。copyWord 方法是根据惩罚内容。完成单词抄写的主要逻辑。

我们重点看一下 coppyWord 方法。count 变量是计数器，记录抄写的总次数。threadName 是本线程的名称，这里通过 Thread 的静态方法 currentThread 取得当前线程，然后通过 getName 方法获取线程名称。

在 while 循环体中，当 punishment 的剩余抄写次数大于 0 时，执行抄写逻辑，否则抄写任务完成，跳出循环。main 方法代码如下：

```java
public class StudentClient {
    public static void main(String[] args) {
        Punishment punishment = new Punishment(100,"internationalization");
        Student student = new Student("小明",punishment);
        student.copyWord();
    }
}
```
在控制台可以清楚地看到小明抄写了 100 次单词。不过此时的代码并没有引入多线程，是单线程小明在工作。唯一看到的和线程沾边的就是日志中的 “main 线程”，这是通过 Thread.currentThread().getName () 获取的当前线程名称，也就是 main 函数所在的线程。

### 1.3 继承 Thread 实现独立线程单词抄写

接下来我们尝试为小明单独起一个线程做这个事情，而不是在 main 线程中完成。回到我们所讲的主题，实现多线程的方式上，我们先采用继承 thread 类，重写 run 方法的方式。改版后，student 代码如下:

```java
//1、继承Thread类
public class Student extends Thread{
    private String name;
    private Punishment punishment;

    public Student(String name, Punishment punishment) {
        //2、调用Thread构造方法，设置threadName
        super(name);
        this.name=name;
        this.punishment = punishment;
    }

    public void copyWord() {
        int count = 0;
        String threadName = Thread.currentThread().getName();

        while (true) {
            if (punishment.getLeftCopyCount() > 0) {
                int leftCopyCount = punishment.getLeftCopyCount();
                System.out.println(threadName+"线程-"+name + "抄写" + punishment.getWordToCopy() + "。还要抄写" + --leftCopyCount + "次");
                punishment.setLeftCopyCount(leftCopyCount);
                count++;
            } else {
                break;
            }
        }
        System.out.println(threadName+"线程-"+name + "一共抄写了" + count + "次！");
    }
    //3、重写run方法，调用copyWord完成任务
    @Override
    public void run(){
        copyWord();
    }
}
```

提醒下，在第 2 个点，我们设置了线程的名称，一会在输出中会看到带来的变化。

main 方法代码如下：
```java
public class StudentClient {
    public static void main(String[] args) {
        Punishment punishment = new Punishment(100,"internationalization");
        Student student = new Student("小明",punishment);
        student.start();
    }
}
```

可以看到此时调用的不是 student 的 copyWord 方法，而是调用了 start 方法。start 方法是从 Thread 类继承而来，调用后线程进入就绪状态，等待 CPU 的调用。而 start 方法最终会触发执行 run 方法，在 run 方法中 copyWord 被执行。输出如下:

```text
小明线程-小明抄写internationalization。还要抄写99次
......（中间省略）
小明线程-小明抄写internationalization。还要抄写0次
小明线程-小明一共抄写了100次！
```

我们可以看到，现在不再是 main 线程在工作了，而是小明线程。这说明 student 已经工作在 “小明” 线程上。为了更加直观，我们在 student.start () 后面加一行代码:

```java
System.out.println("Another thread will finish the punishment。 main thread is finished" );
```

可以看到主线程在 student.start () 后，会立即向下执行。而小明线程则在独立执行 copyWord 方法。这里你可以做个对比，单线程情况下，一定是在小明抄写的所有输出后才会输出 “main thread is finished”。

### 1.4 多线程并发实现单词抄写

你心里一定在想，这个例子没有看到多线程的好处啊？是的，如果仅仅是小明一个人去完成任务，其实和单线程没有区别。但是假如小明找来了几个同学帮他一起写呢？

我们在 main 方法中启动多个线程一块完成单词抄写任务

```java
public static void main(String[] args) {
    Punishment punishment = new Punishment(100,"internationalization");

    Student xiaoming = new Student("小明",punishment);
    xiaoming.start();

    Student xiaozhang = new Student("小张",punishment);
    xiaozhang.start();

    Student xiao赵 = new Student("小赵",punishment);
    xiaozhang.start();
}
```

我们在控制台可以看到如下输出：

```
小赵线程-小赵一共抄写了100次！
小明线程-小明一共抄写了100次！
小张线程-小张一共抄写了100次！
```

### 1.5 实现 Runnable 接口，启用单独线程抄写单词

上面讲解了通过继承 Thread 的方式来实现多线程，接下来我们看看如何以实现 Runnable 接口的形式实现多线程。student 代码改造后如下：

```java
public class Student implements Runnable{
    private String name;
    private Punishment punishment;

    public Student(String name, Punishment punishment) {
        this.name=name;
        this.punishment = punishment;
    }

    public void copyWord() {
        int count = 0;
        String threadName = Thread.currentThread().getName();

        while (true) {
          if (punishment.getLeftCopyCount() > 0) {
              int leftCopyCount = punishment.getLeftCopyCount();
              System.out.println(threadName+"线程-"+name + "抄写" + punishment.getWordToCopy() + "。还要抄写" + --leftCopyCount + "次");
              punishment.setLeftCopyCount(leftCopyCount);
              count++;
          } else {
              break;
          }
        }

        System.out.println(threadName+"线程-"+name + "一共抄写了" + count + "次！");
    }

    //重写run方法，完成任务。
    @Override
    public void run(){
        copyWord();
    }
}
```

和继承 thread 实现多线程的区别，在于现在是实现 runnable 接口。不过也是需要实现 run () 方法。另外由于 runnable 是接口，所以之前构造函数中调用父类构造函数的语句需要去掉。

我们再看看 StudentClient 的代码：

```java
public class StudentClient {
    public static void main(String[] args) {
        Punishment punishment = new Punishment(100,"internationalization");
        Thread xiaoming = new Thread(new Student("小明",punishment),"小明");
        xiaoming.start();
    }
}
```

可以看到我们需要创建一个 thread，把实现了 runnable 接口的对象通过构造函数传递进去，Thread 构造函数的第二个参数是自定义的 thread name。之前由于 Student 就是 Thread 的子类，所以我们直接通过 new Student 就可以得到线程对象。最后都是通过调用 Thread 对象的 start 方法来启动线程。运行代码后发现输出结果和继承 thread 方式是一模一样的。

## 2. 并发可能会遇到的问题

### 2.1 并发抄写单词问题分析

回到抄单词这个问题上，我们试图引入更多的学生来一块完成任务，那么这些学生怎么知道目前抄写多少单词了？自己是否还需要继续抄写呢？我们看相关代码：

```java
if (punishment.getLeftCopyCount() > 0) {
    int leftCopyCount = punishment.getLeftCopyCount();
    System.out.println(threadName+"线程-"+name + "抄写" + punishment.getWordToCopy() + "。还要抄写" + --leftCopyCount + "次");
    punishment.setLeftCopyCount(leftCopyCount);
}
```

我用通俗的方式来说明这段代码的逻辑。为了让参与抄写单词的学生知道剩余抄写的数量，我们找来了一块小黑板，然后把剩余的总量写在上面，每个学生抄写之前先看一眼黑板，如果剩余的数量大于零，那么还需要继续抄写，抄写完后，擦掉黑板上的数字，把剩余数量-1，写上去。

OK，一个人按照这个流程抄写是没问题的，但是多个人同时抄写，问题就多了。

1. 读取次数和抄完更新次数之间有时间间隔，此时别的学生也会读到同样的剩余次数，那么这次抄写就是多余的；
2. 在更新leftCopyCount的时候，可能其它多个线程已经更新过了，也就是说此时leftCopyCount并不是你当初取出来的值，那么可能会把剩余数量更新的比此时还要大。这样其它线程的抄写就白做了。因为剩余数量被更新了回去。

### 2.2 尝试解决并发问题

为了解决这两个问题我们修改copyWord方法代码如下：

```java
public void copyWord() {
    int count = 0;
    String threadName = Thread.currentThread().getName();

    while (true) {
        if (punishment.getLeftCopyCount() > 0) {
            int leftCopyCount = punishment.getLeftCopyCount();
            leftCopyCount--;
            if(leftCopyCount<punishment.getLeftCopyCount()){
                punishment.setLeftCopyCount(leftCopyCount);
            }
            System.out.println(threadName+"线程-"+name + "抄写" + punishment.getWordToCopy() + "。还要抄写" + leftCopyCount + "次");
            count++;
        } else {
            break;
        }
    }

    System.out.println(threadName+"线程-"+name + "一共抄写了" + count + "次！");
}
```

可以看到代码中主要有两个变化：

1. 取得剩余次数后马上更新-1后的次数。看似是避免了读取和更新间的时间间隔。
2. 更新剩余次数前先判断自己的更新次数是否为最新，避免更新后次数反而变大的问题。
这么修改后看起来好像没有问题了，那么我们再来试一下。

执行以下main方法：

```java
public static void main(String[] args) {
    Punishment punishment = new Punishment(100,"internationalization");

    Student xiaoming = new Student("小明",punishment);
    xiaoming.start();

    Student xiaozhang = new Student("小张",punishment);
    xiaozhang.start();

     Student xiaozhao = new Student("小赵",punishment)
     xiaozhao.start();
}
```

总数是100，问题解决了！等等，真的解决了吗？我们回过头再看改后的copyWord代码，虽然程序读取剩余次数后，马上更新，并且加了小于才更新的判断。但是仔细想想，这样并不是万全之策，因为小明和小张很可能恰巧同时去看剩余次数，取得剩余次数n后，各自计算剩余次数为n-1，但是假如小明正好计算的快一点，小明先把剩余次数更新为了n-1，虽然小张不符合更新条件，但是在剩余第n次的这次抄写上，小明和小张各抄写了一次，也就是说多抄写了一次。

### 2.3 线程安全

为什么上面代码打出的日志中，三人抄写总和是正确的100呢？有没有可能是抄写数量太小，全部抄写完也没有发生上面描述的两人同时去查看剩余次数的情况？为了验证这个推论，我们把抄写次数增多，看是否会出现问题。

在我的电脑上，抄写数量加大到1000，三人抄写总和依然是正确的。但加大到10000时，问题出现了，有时会出现三人抄写次数大于10000的现象。我继续加大到1000000，此时基本每次执行，三人执行总和都要超出1-5次。以上实验结果，根据实验电脑的不同会有所区别。现在已经能够得出结论了，这样修改是不行的，原因前文已经说明，因为有小概率两人甚至三人同时查看剩余次数，导致重复抄写。

以上所描述的问题，就是大家耳熟能详的线程安全问题。线程安全问题来源于并发时对共享资源的操作。在本例中，我们把剩余次数写在黑板上，大家都去黑板上读取剩余次数并更新。那么共享资源就是黑板上的剩余抄写次数。

我们先不谈代码如何修改，我们来想一想现实生活中如何解决上述问题。

问题出在小明读取剩余次数的同时，小张、小赵也可以读取，三人很可能读到同样的次数。并且读取完，三人都会根据自己的计算去更新剩余次数，所以才会乱了套。我们可以改为谁要读取次数时先做个标记（比如在次数边上写上自己名字），代表自己在操作，此时别人只能等待。详细流程如下图：

![img](~@pic/img/xiancheng2-3.jpg)

1. 读取剩余次数前，先看纸上是否有名字。没有名字，在纸上写上自己的名字；

2. 如果纸上已经有名字则等待，并且一直观察纸上名字是否被擦除；

3. 成功写上自己名字的同学，更新次数为n-1；

4. 擦掉自己的名字；

5. 其他等待者观察到名字被擦掉，则抢着写上自己的名字。

这样确保了同一时间只有一个人在操作剩余次数，再也不会乱套了。

### 2.4 多线程相关概念

以上流程引入了多线程中的一个重要概念–**同步**。所谓的同步就是某一段流程同时只能有一个线程执行，其它线程需要等待。对于本例，读取剩余次数，并更新剩余次数这两步操作需要做同步控制。操作剩余次数之前需要写名字代表自己在做操作，这是在**加锁**。而擦除名字则是释放锁。假如小明先成功写上自己的名字，而小张和小赵按照先来后到的顺序排队，那么就是**公平锁**。但假如两人并不排队，而是通过争抢获取写名字的权利，那么这就是**非公平锁**。在这种情况下，如果小张很瘦弱，既抢不过小赵，也抢不过小明，那么小张永远无法读取剩余次数，也就无法抄写单词，这种情况就叫做**线程饿死**。

## 3. Thread vs Runnable

多线程从根本上讲只有一种实现方式，就是实例化Thread，并且提供其执行的run方法。无论你是通过继承thread还是实现runnable接口，最终都是重写或者实现了run方法。而你真正启动线程都是通过实例化Thread，调用其start方法。我们看下前文中不同实现方式的例子：

1. thread
```java
Student xiaoming = new Student("小明",punishment);
xiaoming.start();
```
2. runnable
```java
Thread xiaoming = new Thread(new Student("小明",punishment),"小明");
xiaoming.start();
```

两种方式都是创建 Thread 或者 Thread 的子类，通过 Thread 的 start 方法启动。唯一不同是第一种 run 方法实现在 Thread 子类中。第二种则是把run方法逻辑转移到 Runnable 的实现类中。线程启动后，第一种方式是 thread 对象运行自己的 run 方法逻辑，第二种方式则是调用 Runnable 实现的 run 方法逻辑。如下图所示：

![img](~@pic/img/threadvsrunnable.jpg)

相比较来说，第二种方式是更好的实践，原因如下：

1. java语言中只能单继承，通过实现接口的方式，可以让实现类去继承其它类。而直接继承thread就不能再继承其它类了；
2. 线程控制逻辑在Thread类中，业务运行逻辑在Runnable实现类中。解耦更为彻底；
3. 实现Runnable的实例，可以被多个线程共享并执行。而实现thread是做不到这一点的。

:::tip
看到这里，你是不是很好奇，为什么程序中调用的是Thread的start方法，而不是run方法？为什么线程在调用start方法后会执行run方法的逻辑呢？接下来我们通过开始start方法的源代码来找到答案。
:::

### 3.1 Thread start方法源代码分析

我们先看Thread类start方法源代码，如下

```java
public synchronized void start() {
    if (threadStatus != 0)
        throw new IllegalThreadStateException();
    group.add(this);

    boolean started = false;
    try {
        start0();
        started = true;
    } finally {
        try {
            if (!started) {
                group.threadStartFailed(this);
            }
        } catch (Throwable ignore) {
        }
    }
}
```

主要逻辑如下：

1. 检查线程的状态，是否可以启动；
2. 把线程加入到线程group中；
3. 调用了start0()方法。

可以看到Start方法中最终调用的是start0方法，并不是run方法。那么我们再看start0方法源代码：

```java
private native void start0();
```

什么也没有，因为start0是一个native方法，也称为JNI（Java Native Interface）方法。JNI方法是java和其它语言交互的方式。同样也是java代码和虚拟机交互的方式，虚拟机就是由C++和汇编所编写。

由于start0是一个native方法，所以后面的执行会进入到JVM中。那么run方法到底是何时被调用的呢？这里似乎找不到答案了。

难道我们错过了什么？回过头来我们再看看Start方法的注解。其实读源代码的时候，要先读注解，否则直接进入代码逻辑，容易陷进去，出不来。原来答案就在start方法的注解里，我们可以看到：

```java
* Causes this thread to begin execution; the Java Virtual Machine
* calls the <code>run</code> method of this thread.
* <p>
* The result is that two threads are running concurrently: the
* current thread (which returns from the call to the
* <code>start</code> method) and the other thread (which executes its
* <code>run</code> method).
* <p>
* It is never legal to start a thread more than once.
* In particular, a thread may not be restarted once it has completed
* execution.
```

最关键一句*the Java Virtual Machine calls the run method of this thread。*由此我们可以推断出整个执行流程如下：

`start` ---> `start0` ---> `run`

start方法调用了start0方法，start0方法在JVM中，start0中的逻辑会调用run方法。

至此，我们已经分析清楚从线程创建到run方法被执行的逻辑。但是通过实现Runnbale的方式实现多线程时，Runnable的run方法是如何被调用的呢？

## 31 凭票取餐—Future模式详解

我们先来看一个例子，假如你中午要出去买一份午餐打包带回家，并且要去超市买一管牙膏，应该怎么做才会时间最短？当然是点好外卖，然后去超市买牙膏，等你回来看外卖是否已经做好了，如果做好了，拿小票取餐。如果还没好，那就继续等待，等做好后取餐回家。

如果程序不使用多线程实现的话，那么主线程就会阻塞在外卖加工过程上，直到午餐做好，才能去超市买东西。但如果我们采用多线程，可以点餐后马上去超市买牙膏，同时有新的线程加工你的午餐。今天我们来学习一种新的多线程应用模式 Future，解决起类似问题就容易多了。

### 31.1 Future 模式介绍

先来回顾下之前我们讲解的 Thread 和 runnable，实现多线程的方式是新起线程运行 run 方法，但是 run 方法有个缺陷是没有返回值，并且主线程也并不知道新的线程何时运行完毕。上文的例子，我们不但需要做饭的线程返回午餐，并且主线程需要知道午餐已经好了。使用我们之前学习知识，通过 wait、notify 和共享资源也可以实现，但会比较复杂。其实 JDK 提供了非常方便的工具就是 Future。Future 持有要运行的任务，以及任务的结果。主线程只要声明了 Future 对象，并且启动新的线程运行他。那么随时能通过 Future 对象获取另外线程运行的结果。

接下来我们看看 Future 如何实现例子中的场景。

### 31.2 Future 使用
上述例子的代码如下：

```java
public class Client {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        
      FutureTask<String> cookTask = new FutureTask<>(new Callable<String>() {
            @Override
            public String call() throws Exception {
                Thread.sleep(3000);
                return "5斤的龙虾";
            }
        });

        Long startTime = System.currentTimeMillis();

        System.out.println("我点了5斤的龙虾。");
        new Thread(cookTask).start();

        System.out.println("我去买牙膏。");
        TimeUnit.SECONDS.sleep(2);
        System.out.println("我买到牙膏了！");
      
        String lunch = cookTask.get();
        System.out.println("我点的"+lunch+"已经OK了！");

        Long userTime = (System.currentTimeMillis() - startTime)/1000;
        System.out.println("我一共用了"+userTime+"秒买午餐并且买牙膏。");
    }
}
```

主线程运行后，先点了 5 斤的龙虾，然后一个新的线程就开始去执行 cookTask 了。等会儿，到这里你一定会问，Thread 构造方法需要传入 Runnable 的实现啊？没错，FutureTask 实现了 Runnable 接口。FutureTask 的 run 方法实际执行的是 Callable 的 call 方法。那么新的线程 start 后，实际做饭的逻辑会被执行：自线程 sleep3 秒后返回 “5 斤的龙虾”。

主线程在启动做饭的自线程后继续向下执行，去买牙膏。这里 sleep 两秒，模拟买牙膏的时间消耗。

买到牙膏接下来的一行代码 String lobster = cookTask.get (); 重点说一下，此时分两种情况：

cookTask 运行的线程已经结束了，那么可以直接取到运行的结果赋值给 lunch；
cookTask 运行的线程还没有执行结束，此时主线程会阻塞，直到能取得运行结果。
cookTask 就是你的购物小票，只要你没弄丢，随时能去取你的午饭。

程序最后计算了整个过程的执行时间。由于采用了多线程并发，所以执行时间应该等于耗时最长的那个任务。这个例子中做龙虾 3 秒 > 买牙膏 2 秒，所以总共耗时 3 秒，输出如下：

```java
我点了5斤的龙虾
我去买牙膏
我买到牙膏了！
我点的5斤的龙虾已经OK了
我一共用了3秒买午餐并且买牙膏
```

假如我调整买牙膏需要 10 秒，那么输出则如下：
```java
我点了5斤的龙虾
我去买牙膏
我买到牙膏了！
我点的5斤的龙虾已经OK了
我一共用了10秒买午餐并且买牙膏
```

:::tip
现在我们想一下，假如单线程串行执行，点完午餐必须等待午餐做好了，才能去买牙膏。那么永远耗时都是 2 者之和。采用并发执行后，仅为时间较长的那个任务的时间。

由于我们调用 Future 的 get 方法后主线程就开始阻塞了，所以我们应该在真正需要使用 Future 对象的返回结果时才去调用，充分利用并发的特性来提升程序性能。
:::

### 31.3 Future 源码解析

Future 是一个接口，而 FutrueTask 则是他的实现，我们看一下它们的继承关系：

![img](~@pic/img/Futureyuanma.jpg)

FutureTask 不但实现了 Future 而且实现了 Runnable 接口。这也是为什么它能作为参数传入 Thread 构造方法。

Runnable 接口我们讲过，里面只有一个 run 方法，用于被 Thread 调用。我们看一下 Future 接口有哪些方法：

![img](~@pic/img/Futurefangfa.jpg)

- cancel 用于尝试取消任务。

- get 用于等待并获取任务执行结果。带时间参数的 get 方法只会等待指定时间长度。

- isCancelled 返回任务在完成前是否已经被取消。

- isDone 返回任务是否完成。

- 我们用到最多的就是 get 方法，获取任务的执行结果。

#### 31.3.1 FutureTask 构造方法
```java
public FutureTask(Callable<V> callable) {
    if (callable == null)
        throw new NullPointerException();
    this.callable = callable;
    this.state = NEW;       // ensure visibility of callable
}
```

需要传入 Callable 的实现，Callable 是一个接口，定义了 call 方法，返回 V 类型。

然后定义了 FutureTask 的状态为 NEW。FutrueTask 定义了如下状态：

```java
private static final int NEW          = 0;
private static final int COMPLETING   = 1;
private static final int NORMAL       = 2;
private static final int EXCEPTIONAL  = 3;
private static final int CANCELLED    = 4;
private static final int INTERRUPTING = 5;
private static final int INTERRUPTED  = 6;
```

#### 31.3.2 run 方法解析

FutrueTask 实现了 Runnbale 接口，所以 Thread 运行后实际上执行的是 FutrueTask 的 run 方法。我们要想了解 Future 的实现原理，那么就应该从它的 run 方法开始入手。

```java
public void run() {
  //如果此时状态不为NEW直接结束
  //如果为NEW，但是CAS操作把本线程写入为runner时，发现runner已经不为null，那么也直接结束
    if (state != NEW ||
        !UNSAFE.compareAndSwapObject(this, runnerOffset,
                                     null, Thread.currentThread()))
        return;
    try {
      //取得Callable对象
        Callable<V> c = callable;
        if (c != null && state == NEW) {
            V result;
            boolean ran;
            try {
              //运行Callable对象的call方法，并且取得返回值。
                result = c.call();
                ran = true;
            } catch (Throwable ex) {
                result = null;
                ran = false;
                setException(ex);
            }
          //如果call方法成功执行结束，那么把执行结果设置给成员变量outcome;
            if (ran)
                set(result);
        }
    } finally {
        // runner must be non-null until state is settled to
        // prevent concurrent calls to run()
        runner = null;
        // state must be re-read after nulling runner to prevent
        // leaked interrupts
        int s = state;
        if (s >= INTERRUPTING)
            handlePossibleCancellationInterrupt(s);
    }
}
```

核心逻辑就是执行运行 Callable 对象的 call 方法，把返回结果写入 outcome。outcome 用来保存计算结果。

保存计算结果则是通过 set 方法。

#### 31.3.3 set 方法解析

set 方法代码如下：

```java
protected void set(V v) {
  	//状态还是NEW，保存计算结果给outcome
    if (UNSAFE.compareAndSwapInt(this, stateOffset, NEW, COMPLETING)) {
        outcome = v;
      //更新状态为NORMAL
        UNSAFE.putOrderedInt(this, stateOffset, NORMAL); // final state
      //唤醒等待的线程
        finishCompletion();
    }
}
```

如果没有被取消则会保存计算结果 v 到 outcome。然后更新最终状态为 NORMAL。最后调用 finishCompletion 方法唤醒阻塞的线程。代码如下：

```java
private void finishCompletion() {
    // assert state > COMPLETING;
  //遍历等待线程，结束等待
    for (WaitNode q; (q = waiters) != null;) {
        if (UNSAFE.compareAndSwapObject(this, waitersOffset, q, null)) {
            for (;;) {
              //结束等待线程的挂起
                Thread t = q.thread;
                if (t != null) {
                    q.thread = null;
                    LockSupport.unpark(t);
                }
              //如果没有下一个等待线程，那么结束循环
                WaitNode next = q.next;
                if (next == null)
                    break;
                q.next = null; // unlink to help gc
                q = next;
            }
            break;
        }
    }
		//全部完成后回调FutrueTask的done方法。done方法为空，可以由子类实现。
    done();
		//清除callable
    callable = null;        // to reduce footprint
}
```

#### 31.3.4 get 方法解析

get 方法用于获取任务的返回值，如果还没有执行完成，则会阻塞，代码如下：

```java
public V get() throws InterruptedException, ExecutionException {
    //获取当前Task的状态
  	int s = state;
    //如果还没有完成，则阻塞等待完成
    if (s <= COMPLETING)
        s = awaitDone(false, 0L);
  	//获取任务执行的返回结果
    return report(s);
}
```

我们先来看 awaitDone 的代码：

```java
private int awaitDone(boolean timed, long nanos)
    throws InterruptedException {
  //计算等待截止时长
    final long deadline = timed ? System.nanoTime() + nanos : 0L;
    WaitNode q = null;
    boolean queued = false;
    for (;;) {
      //当前线程如果被打断，则不再等待。从等待链表中移除
        if (Thread.interrupted()) {
            removeWaiter(q);
            throw new InterruptedException();
        }
			//取得目前的状态
        int s = state;
      //如果已经执行完成，清空q节点保存的线程
        if (s > COMPLETING) {
            if (q != null)
                q.thread = null;
            return s;
        }
      //如果正在执行，让出CPU执行权
        else if (s == COMPLETING) // cannot time out yet
            Thread.yield();
      //没有进入以上分支，运行到此分支，这说明此线程确实需要开始等待了，
      //那么如果还未为此线程建立关联的等待节点，则进行创建。
        else if (q == null)
            q = new WaitNode();
      //通过CAS把此线程的等待node加入到连表中。失败的话，下次循环若能运行到此分支，会继续添加。
        else if (!queued)
            queued = UNSAFE.compareAndSwapObject(this, waitersOffset,
                                                 q.next = waiters, q);
      //如果设置了超时，检查是否超时。超时的话结束等待。 否则挂起超时时长
      //如果没有设置超时时长，则永久挂起
      //回到上面的finishCompletion方法，等到task执行完成后会执行LockSupport.unpark(t)，结束阻塞。
      else if (timed) {
            nanos = deadline - System.nanoTime();
            if (nanos <= 0L) {
                removeWaiter(q);
                return state;
            }
            LockSupport.parkNanos(this, nanos);
        }
        else
            LockSupport.park(this);
    }
}
```

最后我们看一下 report 方法：

```java
private V report(int s) throws ExecutionException {
  //获取执行结果
    Object x = outcome;
  //NORMAL为正常结束，那么直接把X转型后返回
    if (s == NORMAL)
        return (V)x;
  //如果任务被取消了，则抛出异常
    if (s >= CANCELLED)
        throw new CancellationException();
    throw new ExecutionException((Throwable)x);
}
```

outcome 保存的就是任务的执行结果。根据此时的状态，选择返回执行结果还是抛出取消的异常。

最后我们总结下 FutureTask 的代码：

1. FutureTask 实现 Runnable 和 Future 接口；

2. 在线程上运行 FutureTask 后，run 方法被调用，run 方法会调用传入的 Callable 接口的 call 方法；

3. 拿到返回值后，通过 set 方法保存结果到 outcome，并且唤醒所有等待的线程；

4. 调用 get 方法获取执行结果时，如果没有执行完毕，则进入等待，直到 set 方法调用后被唤醒。

下图示意了两个线程运行 task 和 get 时的程序逻辑：

![img](~@pic/img/futureTask.jpg)

#### 31.4 总结

Future 模式在实际开发中有着大量的应用场景。比如说微服务架构中，需要调用不同服务接口获取数据，但是接口调用间并无依赖关系，那么可以通过 FutureTask 并发调用，然后再执行后续逻辑。如果我们采用串行的方式，则需要一个接口返回后，再调用下一个接口。FutreTask 需要结合 Callable 接口使用，示例代码中为了让大家显示的看到 Callable 接口，所以采用匿名对象的方式。实际使用中我们可以使用 lambda 表达式来简化代码，如下：

```java
FutureTask<String> cookTask = new FutureTask<>(() -> {
    Thread.sleep(3000);
    return "5斤的龙虾";
})
```

## 34 CompletableFuture

### 34.1 CompletableFuture 起源

CompletableFuture 作为 Java 8 的新特性被引入。任何工具的出现肯定带着自己的使命，那么它是用来解决什么问题的呢？

在现实世界中，我们需要解决的复杂问题都是要分为若干步骤。就像我们的代码一样，一个复杂的逻辑方法中，会调用多个方法来一步一步实现。

设想如下场景，植树节要进行植树，分为下面几个步骤：

1. 挖坑 10 分钟

2. 拿树苗 5 分钟

3. 种树苗 20 分钟

4. 浇水 5 分钟

其中 1 和 2 可以并行，1 和 2 都完成了才能进行步骤 3，然后才能进行步骤 4。

我们有如下几种实现方式：

**1、只有一个人种树**

如果现在只有一个人植树，要种 100 棵树，那么只能按照如下顺序执行：
可以看到串行执行，只能种完一棵树再种一棵，那么种完 100 棵树需要 40 * 100 = 4000 分钟。
这种方式对应到程序，就是单线程同步执行。

**2、三个人同时种树，每个人负责种一棵树**

如何缩短种树时长呢？你肯定想这还不好办，学习了这么久的并发，这肯定难不倒我。不是要种 100 棵树吗？那我找 100 个人一块种，每个人种一棵。那么只需要 40 分钟就可以种完 100 棵树了。

没错，如果你的程序有个方法叫做 plantTree，里面包含了如上四部，那么你起 100 个线程就可以了。但是，请注意，100 个线程的创建和销毁需要消耗大量的系统资源。并且创建和销毁线程都有时间消耗。此外CPU的核数并不能真的支持100个线程并发。如果我们要种1万棵树呢？总不能起一万个线程吧？

所以这只是理想情况，我们一般是通过线程池来执行，并不会真的启动100个线程。

**3、多个人同时种树。种每一棵树的时候，不依赖的步骤可以分不同的人并行干**

这种方式可以进一步缩短种树的时长，因为第一步挖坑和第二步拿树苗可以两个人并行去做，所以每棵树只需要35 分钟。如下图：

![img](~@pic/img/plantTree.jpg)

如果程序还是 100 个主线程并发运行 plantTree 方法，那么只需要 35 分钟种完 100 颗树。

这里需要注意每个线程中，由于还要并发两个线程去做 1，2 两个步骤。实际运行中会又 100*3 = 300 个线程参与植树。但是负责 1，2 步骤的线程只会短暂参与，然后就闲置了。

这种方法和第二种方式也存在大量创建线程的问题。所以也只是理想情况。

**4、假如只有 4 个人植树，每个人只负责自己的步骤，那么执行如下图**

![img](~@pic/img/plantTree2.jpg)

可以看到一开始小王挖完第一个坑后，小李已经取回两个树苗，但此时小张才能开始种第一个树苗。此后小张就可以一个接一个的去种树苗了，并且在他种下一棵树苗的时候，小赵可以并行浇水。按照这个流程走下来，种完 100 颗树苗需要 10+20x100+5=2015 分钟。比单线程的4000分钟好了很多，但是远远比不上 100 个线程并发种树的速度。不过不要忘记 100 个线程并发只是理想情况，而本方法只用了 4 个线程。

我们再对分工做下调整。每个人不只干自己的工作，一旦自己的工作做完了就看有没有其他工作可以做。比如小王挖坑完后，发现可以种树苗，那么他就去种树苗。小李拿树苗完成后也可以去挖坑或者种树苗。这样整体的效率就会更高了。如果基于这种思想，那么我们实际上把任务分成了 4 类，每类 100 件，一共 400 件任务。400 件任务全部完成，意味着整个任务就完成了。那么任务的参与者只需要知道任务的依赖，然后不断领取可以执行的任务去执行。这样的效率将会是最高的。

前文说到我们不可能通过100个线程并发来执行任务，所以一般情况下我们都会使用线程池，这和上面的设计思想不谋而合。使用线程池后，由于第四种方式把步骤拆的更细，提高了并发的可能性。因此速度会比第二种方式更快。那么和第三种比起来，哪种更快呢？如果线程数量可以无穷大，这两个方法能达到的最短时间是一样的，都是 35 分钟。不过在线程有限的情况下，第四种方式对线程的使用率会更高，因为每个步骤都可以并行执行（参与种树的人完成自己的工作后，都可以去帮助其他人），线程的调度更为灵活，所以线程池中的线程很难闲下来，一直保持在运转之中。是的，谁都不能偷懒。而第三种由于只能并发在 plantTree 方法及挖坑和拿树苗，所以不如第四种方式灵活。

上文讲了这么多，主要是要说明 CompletableFuture 出现的原因。他用来把复杂任务拆解为一个个衔接的异步执行步骤，从而提升整体的效率。我们回一下小节题目：`谁都不能偷懒`。没错，这就是 CompletableFuture 要达到的效果，通过对计算单元的抽象，让线程能够高效的并发参与每一个步骤。同步的代码通过 CompletableFuture 可以完全改造为异步代码。下面我们就来看看如何使用 CompletableFuture。

### 34.2 CompletableFuture 介绍

CompletableFuture 实现了 Future 接口并且实现了 CompletionStage 接口。Future 接口我们已经很熟悉了，而CompletionStage 接口定了异步计算步骤之间的规范，这样确保一步一步能够衔接上。CompletionStage 定义了38 个 public 的方法用于异步计算步骤间的衔接。接下来我们会挑选一些常用的，相对使用频率较高的方法，来看看如何使用。

#### 34.2.1 已知计算结果

如果你已经知道 CompletableFuture 的计算结果，可以使用静态方法 completedFuture。传入计算结果，声明CompletableFuture 对象。在调用 get 方法时会立即返回传入的计算结果，不会被阻塞，如下代码：

```java
public static void noComputation() throws ExecutionException, InterruptedException {
    CompletableFuture<String> completableFuture
            = CompletableFuture.completedFuture("hello world");

    System.out.println("result is " + completableFuture.get());
}

public static void main(String[] args) throws ExecutionException, InterruptedException {
    noComputation();
}
```

输出为：

`result is hello world`

是不是觉得这种用法没有什么意义？既然知道计算结果了，直接使用就好了，为什么还要通过 CompletableFuture 进行包装？这是因为异步计算单元需要通过 CompletableFuture 进行衔接，所以有的时候我们即使已经知道计算结果，也需要包装为 CompletableFuture，才能融入到异步计算的流程之中。

#### 34.2.2 封装有返回值的异步计算逻辑

这是我们最常用的方式。把需要异步计算的逻辑封装为一个计算单元，交由 CompletableFuture 去运行。如下面的代码：

```java
public static void supplyAsync() throws ExecutionException, InterruptedException {
    CompletableFuture<String> completableFuture
            = CompletableFuture.supplyAsync(() -> "挖坑完成");

    System.out.println("result is " + completableFuture.get());
}

public static void main(String[] args) throws ExecutionException, InterruptedException {
    supplyAsync();
}
```

这里我们使用了 CompletableFuture 的 supplyAsync 方法，以 lambda 表达式的方式向其传递了一个 supplier 接口的实现。supplier 是只有一个方法的函数接口，这里使用的就是常说的函数式编程。关于函数式编程并不在本专栏讨论范围内，这里你只需要知道我们为 supplyAsync 方法传入了一个可执行的函数，而 “Hello world” 就是这段函数的返回值。我们运行后结果如下：

`result is 挖坑完成`

可见 completableFuture.get() 拿到的计算结果就是你传入函数执行后 return 的值。那么如果你有需要异步计算的逻辑，那么就可以放到 supplyAsync 传入的函数体中。这段函数是如何被异步执行的呢？如果你跟入代码可以看到其实 supplyAsync 是通过 Executor，也就是线程池来运行这段函数的。completableFuture 默认使用的是ForkJoinPool，当然你也可以通过为 supplyAsync 指定其他 Excutor，通过第二个参数传入 supplyAsync 方法。

supplyAsync 使用场景非常多，举个简单的例子，主程序需要调用多个微服务的接口请求数据，那么就可以启动多个 CompletableFuture，调用 supplyAsync，函数体中是关于不同接口的调用逻辑。这样不同的接口请求就可以异步同时运行，最后再等全部接口返回时，执行后面的逻辑.

#### 34.2.3 封装无返回值的异步计算逻辑

supplyAsync 接收的函数是有返回值的。有些情况我们只是一段计算过程，并不需要返回值。这就像 Runnable 的run 方法，并没有返回值。这种情况我们可以使用 runAsync方法，如下面的代码：

```java
public static void runAsync() throws ExecutionException, InterruptedException {
    CompletableFuture<Void> completableFuture
            = CompletableFuture.runAsync(() -> System.out.println("挖坑完成"));

   completableFuture.get();
}


public static void main(String[] args) throws ExecutionException, InterruptedException {
    supplyAsync();
}
```

runAsync 接收 runnable 接口的函数。所以并无返回值。栗子中的逻辑只是打印“挖坑完成”。

#### 34.2.4 进一步处理异步返回的结果，并返回新的计算结果

当我们通过 supplyAsync 完成了异步计算，返回 CompletableFuture，此时可以继续对返回结果进行加工，如下面的代码：

```java
public static void thenApply() throws ExecutionException, InterruptedException {
    CompletableFuture<String> completableFuture
            = CompletableFuture.supplyAsync(() -> "挖坑完成")
            .thenApply(s->s+",并且归还铁锹")
            .thenApply(s->s+"，全部完成。");

    System.out.println("result is " + completableFuture.get());
}


public static void main(String[] args) throws ExecutionException, InterruptedException {
    thenApply();
}
```

在调用 supplyAsync 后，我们两次链式调用 thenApply 方法。s 是前一步 supplyAsync 返回的计算结结果，我们对结算结果进行了两次再加工，输出如下：

```java
result is 挖坑完成,并且归还铁锹，全部完成。
```

我们可以通过 thenApply 不断对计算结果进行加工处理。

如果想异步运行 thenApply 的逻辑，可以使用 thenApplyAsync。使用方法 xiangtong1，只不过会通过线程池异步运行.

#### 34.2.5 进一步处理异步返回的结果，无返回

这种场景你可以使用 `thenApply` 。这个方法可以让你处理上一步的返回结果，但无返回值。参照如下代码：

```java
public static void thenAccept() throws ExecutionException, InterruptedException {
    CompletableFuture<Void> completableFuture
            = CompletableFuture.supplyAsync(() -> "挖坑完成")
            .thenAccept(s-> System.out.println(s+",并且归还铁锹"));
    completableFuture.get();
}


public static void main(String[] args) throws ExecutionException, InterruptedException {
    thenAccept();
}
```
这里可以看到 thenAccept 接收的函数没有返回值，只有业务逻辑。处理后返回 CompletableFuture 类型对象。

#### 34.2.6 进一步处理异步返回的结果，并返回新的计算结果

此时你可以使用 `thenRun` 方法，他接收 Runnable 的函数，没有输入也没有输出，仅仅是在异步计算结束后回调一段逻辑，比如记录 log 等。参照下面代码：

```java
public static void thenRun() throws ExecutionException, InterruptedException {
    CompletableFuture<Void> completableFuture
            = CompletableFuture.supplyAsync(() -> "挖坑完成")
            .thenAccept(s-> System.out.println(s+",并且归还铁锹"))
            .thenRun(()-> System.out.println("挖坑工作已经全部完成"));

    completableFuture.get();
}

public static void main(String[] args) throws ExecutionException, InterruptedException {
    thenRun();
}
```

#### 34.2.7 进一步处理异步返回的结果，并返回新的计算结果