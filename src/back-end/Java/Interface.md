# Interface

## Intro
- interface no function body
- all function are public abstract, even no modifier
- interface can have a class
- interface cannot implement interfaces
- interface can extend other interfaces, 1 or multiple
- interface can only be implemented by class (both abstract/ concrete class
- all fields in interface, by default, they are public static final
- java 7 no static method

```java
package com.mercury.interfaces;

public interface Traditional extends Runnable, Cloneable {
	//
	int x = 2;//only public static and final 
	public abstract void test();
	static void test2() {
		
	}
	default void test1() {
		
	}
	class Inner{
		
	}
}

class test implements Traditional{

	@Override
	public void run() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void test() {
		// TODO Auto-generated method stub
		
	}
	
}

```

## Java8 Interface new feature

Java8 Interface can have multi abstract functions, multi default functions, multi static function

default is key word
- default function will not be abstract any more, has to have a body
- default only allowed in interface
- default function are object level function
- default usage: if no overridden implementation, then use the default implementation
- otherwise, use the customized overridden implementation

:::tip
Functional Interfaces(exists since java 1.0)
if only 1 abstraction function defined(no matter how many default/static function), this interface is a functional Interface

@FunctionalInterface this annotation is introduced as part of the jdk 1.8
:::
```java
package com.mercury.interfaces;





@FunctionalInterface
// functional interface 只能有一个abstract
public interface Java8Interface {
	int a = 0;
	public void test(int id, String name);
	
	// static means not override, if you don't provide body, nobody will give body in the future,
	// and is class level function, will be loaded when JVM started
	public static void foo() {
		System.out.println("Java 8 interface static foo()");
	};
	
	default public void bar() {
		System.out.println("Java8 interface default bar()");
	}
	
	// inner class defined in interface is a field of this interface
	// by default, it is public static 
	// not final, can be overridden
	public static class A implements Java8Interface{
		public void test(int id, String name) {
			System.out.println(id + name);
		}
		
		public void bar() {
			
		}
		
	}
	public class B extends A{
		
	}
	public static void main(String[] args) {
		System.out.println("Interface");
		//test() cannot be call, without body, and also need object to call it
		Java8Interface.foo();
		Java8Interface a = new A();
		
		// anonymous one time use
		Java8Interface b = new Java8Interface() {
			@Override
			public void test(int id, String name) {
				System.out.println("b");
			}
		};
		
		// lambda expression used for functional interface
		Java8Interface c = ( id, name) -> {
			System.out.println("c");
			System.out.println(id + "" + name);
			};
	}
	
}

```