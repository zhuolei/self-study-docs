# Class and object

- class name is start with capital, others same with method name rule
- A class can implement multiple interfaces but can only extend 1 abstract class.

## Constructor

1. constructor is used for creating object of this class
2. we can overload constructor

:::tip
Does constructor have return type?
- no return type specified, if specified, it is not a constructor any more, no compile error
- because it will return the object of this class, type is this class
:::



```java
public class TraditionalConcreteClass extends TraditionalAbstractClass implements Traditional{
	
	public int x = 5;
	
	public TraditionalConcreteClass() {
		System.out.print("call concrete constructor");
	}
	//
	// 1. constructor is used for creating object of this class
	
	public TraditionalConcreteClass TraditionalConcreteClass(int x) {
		System.out.print("call concrete constructor" + x);
		return null;
	}
	//body : to implement the function
	public void foo() {
		
	}
	
	public void foo(int x) {
		
	}
	// old time, overload must have same return;
	// new time, overload doesn't matter
	public Integer foo(int x, int y) {
		return 1;
	}
	//annotation
	//adding override system will check code
	@Override
	public void test() {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void x() {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void bar(){
			
	}
	//class can only be execute by main method
	public static void main(String ar[]) {
		TraditionalConcreteClass a = new TraditionalConcreteClass();
	}
	@Override
	public void run() {
		// TODO Auto-generated method stub
		
	}
}

```