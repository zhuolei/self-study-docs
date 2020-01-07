# String

## Immutable

String is immutable. String用来存储字符的数据是private的，而且不提供任何修改内容的方法

::: warning
Why does the string immutable?

String is widely used as parameter for many java classes. Immutable objects cannot be changed, they can be shared among multiple threads freely. So, String is designed to be immutable for the sake of efficiency and security.(Suppose there are 5 reference variables, all refer to one object "apple".If one reference variable changes the value of the object, it will be affected to all the reference variables. That is why string objects are immutable in java.)
:::

## API

```java
public class LearnString {
  public static void main(String[] args) {
    String content = "0123456ABCDesign";
    // length is function in string class
    System.out.println(content.length());
    // toUpperCase() return a new String object, content doesn't change
    System.out.println(content.toUpperCase());
    System.out.println(content.toLowerCase());
    System.out.println(content.charAt(1));
    System.out.println(content.substring(5));
    // substring index [1, 5)
    System.out.println(content.substring(1, 5));

    String str = " abc ";
    // remove space
    str.trim(); // "abc"
    String content2 = "Orange_Apple_Banana";
    char[] chars = content2.toCharArray();
    for (int i = 0; i < chars.length; i++) {
      System.out.println(chars[i]);
    }

    String[] s = content2.split("_");
    // first index
    int indexOf = content2.indexOf('_');
    System.out.println(content.substring(indexOf + 1, content2.length()));
    // last index
    int lastIndexOf = content2.lastIndexOf("_");
    System.out.println(content2.substring(0, lastIndexOf));

    content2.contains("apple"); //false
    content2.startsWith("Orange"); //true
    content2.endsWith("Banana"); //false

    String content3 = "orange_apple_banana";
    // 判断两个string是否相等，一定要用equals
    content2.equals(content3); // false
    content2.equalsIgnoreCase(content3); // true
  }
}
```

**Exmpale**

```java
public class AI {
  public String answer(String question) {
    String ret = null;
    ret = handleCanStart(question);

    if (ret != null) {
      return ret;
    }

    ret = handleAskTail(question);

    if (ret != null) {
      return ret;
    }

    return handleUnknown(question);
  }

  private String handleCanStart(String question) {
    String[] canStart = new String[]{"会", "能", "有", "敢", "在"}；
    for (int i = 0; i < canStart.length; i++) {
      if (question.startsWith(canStart[i])) {
        return canStart[i] + "! ";
      }
    }
    return null;
  }

  private String handleAskTail(String question) {
    String[] askTail = new String[]{"吗？ ", "吗？", "吗"}；
    for (int i = 0; i < askTail.length; i++) {
      if (question.endsWith(askTail[i])) {
        return question.replace(askTail[i], "! ");
      }
    }
    return null;
  }

  private String handleUnknown(String question) {
    return question + "!";
  }
}
```
## Stringpool