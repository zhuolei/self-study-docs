# Java8

## Lambda

### What is Lambda
- **Lambda** is equivalent to a function (method) without a name

- Lambda's are also referred as Anonymous functions.
  - Method parameters
  - Method Body
  - Return Type

- Lambdas are not tied to any class like a regular method
- **Lambda** can also be assigned to variable and passed around.

### Usage of Lambda

- Lambda is mainly used to implement Functional Interfaces(SAM).

```java
@FunctionalInterface
public interface Comparator<T> {
  int compare(T o1, T o2);
}

@FunctionalInterface
public interface Runnable {
  public abstract void run();
}
```
### Implement Runnable using Lambda

```java
public class RunnableLambdaExample {

    public static void main(String[] args) {

        /**
         * Prior Java 8
         */

        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                System.out.println("Inside Runnable 1");
            }
        };

        new Thread(runnable).start();

        //Java 8 - Lambda Syntax

        // ()->{}
        //assigning a lambda to a variable.

        Runnable runnableLambda = () -> {System.out.println("Inside Runnable 2");};

        // you need {} for multiple statements
        Runnable runnableLambdaMultiStatements = () -> {
                                        System.out.println("Inside Runnable 3");
                                        System.out.println("Inside Runnable 3");
        };

        Runnable runnableLambdaSimple = () -> System.out.println("Inside Runnable 3");


        new Thread(runnableLambda).start();
        new Thread(runnableLambdaMultiStatements).start();
        new Thread(runnableLambdaSimple).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Inside Runnable 3");
            }
        }).start();

        new Thread(() -> System.out.println("Inside Runnable 4")).start();


    }
}
```

### Implement comparator with lambda
```java
import java.util.Comparator;

public class ComparatorLambda {

    public static int compareTwoIntegers(Comparator<Integer> comparator, int a, int b){

        return comparator.compare(a,b);
    }

    public static void main(String[] args) {

        /**
         * Prior JAVA 8
         */
        Comparator<Integer> comparator  = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o1.compareTo(o2); // 0 -> if both are equal
                                        // 1 -> if o1 > o2
                                        //-1 -> if o1<o2
            }
        };

        System.out.println(comparator.compare(1,2));

        /**
         * In JAVA 8
         */
        Comparator<Integer> comparatorLambda = (Integer  a,Integer b) -> a.compareTo(b);

        // lambda is smart to know the type of argument
        Comparator<Integer> comparatorLambda1 = (a,b) -> a.compareTo(b);

        System.out.println(comparatorLambda.compare(1,2));


        /**
         * Comparator chaining happens only when the first comparators result is zero.
         */
        System.out.println("Result of chaining comparator is with equal inputs : " + comparatorLambda1.thenComparing(comparatorLambda1).compare(2,2));

        System.out.println("Result of chaining comparator is with not equal inputs: " + comparatorLambda1.thenComparing(comparatorLambda1).compare(3,2));


        System.out.println(comparatorLambda1.compare(1,2));

        System.out.println("The greatest integer is : " + compareTwoIntegers(comparatorLambda,1,2));


    }
}
```

## Functional Interface

Functional Interfaces exists since java 1.0

### Definition:
A functional Interface(SAM) is an interface that has exactly one abstract method

### @FunctionalInterface:
- This annotation is introduced as part of the jdk 1.8
- Optional annotation to signify an interface as Functional Interface.

### New Functional Interfaces in Java8

All Java8 new Functional Interfaces are in the `java.util.function`
- Consumer - BiConsumer
- Predicate - BiPredicate
- Function - BiFunction, UnaryOperator, BinaryOperator
- Supplier

### Consumer
First we need a student class

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Student {
    private String name;
    private int gradeLevel;
    private double gpa;
    private String gender;
    private int noteBooks;
    private Optional<Bike> bike;

    public Optional<Bike> getBike() {
        return bike;
    }

    public void setBike(Optional<Bike> bike) {
        this.bike = bike;
    }

    public Student(){

    }

    public Student(String name, int gradeLevel, double gpa, String gender, int noteBooks, List<String> activities) {
        this.name = name;
        this.gradeLevel = gradeLevel;
        this.gpa = gpa;
        this.gender = gender;
        this.noteBooks = noteBooks;
        this.activities = activities;
    }

    public int getNoteBooks() {

        return noteBooks;
    }

    public void setNoteBooks(int noteBooks) {
        this.noteBooks = noteBooks;
    }

    public Student(String name, int gradeLevel, double gpa, String gender, List<String> activities) {
        this.name = name;
        this.gradeLevel = gradeLevel;
        this.gpa = gpa;
        this.gender = gender;
        this.activities = activities;
    }

    public Student(String s) {
        this.name = s;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getGradeLevel() {
        return gradeLevel;
    }

    public void setGradeLevel(int gradeLevel) {
        this.gradeLevel = gradeLevel;
    }

    public double getGpa() {
        return gpa;
    }

    public void setGpa(double gpa) {
        this.gpa = gpa;
    }

    List<String> activities = new ArrayList<>();

    public  List<String> getActivities() {
        return this.activities;
    }

    public void setActivities(List<String> activities) {
        this.activities = activities;
    }

    public void printListOfActivities(){

        System.out.println("List of Activities are : " + this.activities);
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", gradeLevel=" + gradeLevel +
                ", gpa=" + gpa +
                ", gender='" + gender + '\'' +
                ", activities=" + activities +
                '}';
    }


}
```

Then we have student database class which has all student data

```java
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

public class StudentDataBase {

    public static Supplier<Student> studentSupplier = () -> {
        return  new Student("Adam",2,4.0,"male", Arrays.asList("swimming", "basketball","volleyball"));
    };

    public static Optional<Student> getOptionalStudent(){

        Student student = new Student("Adam",2,4.0,"male", Arrays.asList("swimming", "basketball","volleyball"));

        Bike bike = new Bike("Client123", "Client123");
        student.setBike(Optional.of(bike));
        return Optional.of(student);
    }


    /**
     * Total of 6 students in the database.
     * @return
     */
    public static List<Student> getAllStudents(){

        /**
         * 2nd grade students
         */
        Student student1 = new Student("Adam",2,3.6, "male",10,Arrays.asList("swimming", "basketball","volleyball"));
        Student student2 = new Student("Jenny",2,3.8,"female", 11,Arrays.asList("swimming", "gymnastics","soccer"));
        /**
         * 3rd grade students
         */
        Student student3 = new Student("Emily",3,4.0,"female", 12,Arrays.asList("swimming", "gymnastics","aerobics"));
        Student student4 = new Student("Dave",3,4.0,"male", 15,Arrays.asList("swimming", "gymnastics","soccer"));
        /**
         * 4th grade students
         */
        Student student5 = new Student("Sophia",4,3.5,"female",10, Arrays.asList("swimming", "dancing","football"));
        Student student6 = new Student("James",4,3.9,"male", 22,Arrays.asList("swimming", "basketball","baseball","football"));

        List<Student> students = Arrays.asList(student1,student2,student3,student4,student5,student6);
        return students;
    }
}
```
```java
import com.learnJava.data.Student;
import com.learnJava.data.StudentDataBase;

import java.util.List;
import java.util.function.Consumer;

public class ConsumerExample {

    static Consumer<Student>  c1= p -> System.out.println(p);

    static Consumer<Student>  c2= p -> System.out.print(p.getName().toUpperCase());

    static Consumer<Student>  c3= p -> System.out.println(p.getActivities());


    public static void printName(){

        List<Student> personList = StudentDataBase.getAllStudents();
        // forEach accept consumer implementation
        personList.forEach(c1);

    }

    public static void printNameAndActivities(){
        System.out.println("printNameAndActivities : ");
        List<Student> personList = StudentDataBase.getAllStudents();
        personList.forEach(c2.andThen(c3));
    }

    public static void printNameAndActivitiesUsingCondition(){
        System.out.println("printNameAndActivitiesUsingCondition : ");
        List<Student> personList = StudentDataBase.getAllStudents();
        personList.forEach((s) -> {
            if( s.getGradeLevel()>=3 && s.getGpa()>3.9){
                // what if c2.andThen(c3).andThen(c1).accept(s);
                c2.andThen(c3).accept(s);
            }
        });
    }

    public static void main(String[] args) {

        Consumer<String> c1 = (s) -> System.out.println(s.toUpperCase());

        c1.accept("java8");

        printName();
        printNameAndActivities();
        printNameAndActivitiesUsingCondition();





    }
}

```

### BiConsumer

```java
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

public class BiConsumerExample {

    public static void nameAndActivities(){

        BiConsumer<String, List<String>> studentBiConsumer = (name, activities) -> System.out.println(name + " : " + activities);

        Consumer<String> stringConsumer = (name) -> System.out.println("name is  :" + name);

        List<Student> students = StudentDataBase.getAllStudents();
        // compare the diff between BiConsumer and Consumer
        students.forEach((s) -> studentBiConsumer.accept(s.getName(),s.getActivities()));
    }

    public static void main(String[] args) {


        BiConsumer<String, String> biConsumer = (a,b) -> {
            System.out.println(" a : "  +  a + " b : " + b );
        };
        biConsumer.accept("java7" , "java8");

        BiConsumer<Integer, Integer> multiply = (a,b) -> {
            System.out.println("Multiplication : " + (a * b));
        };


        BiConsumer<Integer, Integer> addition = (a,b) -> {
            System.out.println("Addition : " + (a + b));
        };

        BiConsumer<Integer, Integer> division = (a,b) -> {
            System.out.println("Division : "  + (a / b));
        };


        multiply.andThen(addition).andThen(division).accept(10,5);


        nameAndActivities();

    }
}
```

```java
/**
  *下单商品信息对象
  */
public class Sku {
  // 编号
  private Integer skuId;
  // 商品名称
  private String skuName;
  // 单价
  private Double skuPrice;
  // 购买个数
  private Integer totalNum;
  // 总价
  private Double totalPrice;
  // 商品类型
  private Enum skuCategory;

  public Sku(Integer skuId, String skuName,
            Double skuPrice, Integer totalNum,
            Double totalPrice, Enum skuCategory) {
    this.skuId = skuId;
    this.skuName = skuName;
    this.skuPrice = skuPrice;
    this.totalNum = totalNum;
    this.totalPrice = totalPrice;
    this.skuCategory = skuCategory;
  }

  // todo
}
```

```java
public class CartService {

  private static List<Sku> cartSkuList = new ArrayList<Sku>() {
    
  }
}
```

## Stream

## Optional

