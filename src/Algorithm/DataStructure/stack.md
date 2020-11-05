# Stack

## 栈的应用场景

所有要后进先出的场景 Last In First Out

- 十进制转二进制
![img](~@pic/img/stack1.png)
- 判断字符串的括号是否有效
![img](~@pic/img/stack2.png)
- 函数调用堆栈
![img](~@pic/img/stack3.png)

## 栈方法
- isEmpty(): 如果栈为空则返回true, 否则返回false;
- size(): 返回栈中元素的个数
- top/peek(): 返回栈顶元素, 但不删除该元素
- pop(): 弹出栈顶元素, 同时返回被移除的元素
- push(): 将元素压入栈顶
- clear(): 移除栈里所有元素

:::tip
栈顶即为数组末尾
:::
## Javascript实现

### Using Array

```js
export default class Stack {
	constructor() {
		this.items = [];
	}

	push(item) {
		this.items.push(item);
	}

	pop(item) {
		return this.items.pop();
	}

	peek(item) {
		return this.items[this.items.length - 1];
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}

	clear() {
		this.items = [];
	}

	toString() {
		if (!this.isEmpty()) {
			return '';
		}

		let str = `[${this.items[0]}`;
		for (let i = 1; i < this.items.length; i++) {
			str += `${str},${this.items[i]}`;
		}

		return str + ']';
	}
}
```

### Using Object

```js
// @ts-check

export default class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }
  isEmpty() {
    return this.count === 0;
  }
  size() {
    return this.count;
  }
  clear() {
    /* while (!this.isEmpty()) {
        this.pop();
      } */
    this.items = {};
    this.count = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

```


## C++

```cpp
s.empty();         //如果栈为空则返回true, 否则返回false;
s.size();          //返回栈中元素的个数
s.top();           //返回栈顶元素, 但不删除该元素
s.pop();           //弹出栈顶元素, 但不返回其值
s.push();          //将元素压入栈顶
```

（1）基于数组的栈

```cpp
#include <stack>
#include <iostream>
using namespace std;
 
int main()
{
	stack<int> mystack;
	int sum = 0;
	for (int i = 0; i <= 10; i++){
		mystack.push(i);
	}
	cout << "size is " << mystack.size() << endl;
	while (!mystack.empty()){
		cout << " " << mystack.top();
		mystack.pop();
	}
	cout << endl;
	system("pause");
	return 0;
}
```

## 用栈解决问题

### 从十进制到二进制

十进制数除以2一直到0，并把余数放入栈中

:::tip
用Math.floor返回运算结果的整数部分
The Math.floor() function returns the largest integer less than or equal to a given number.
The Math.round() function returns the value of a number rounded to the nearest integer.
:::
```js
function decimalToBinary(num) {
	const stack = new Stack();
	let binaryNum = '';
	let rem = 0；
	while(num > 0) {
		rem = Math.floor(num % 2);
		stack.push(rem);
		num = Math.floor(num / 2);
	}

	while(!stack.isEmpty()) {
		binaryNum += stack.pop().toString();
	}
	return binaryNum;
}
```

### 进制转换算法（从十进制到2-36任意进制）
:::tip
10进制到8进制，余数是0-7，从11进制开始字母表中的每个字母将代表相应的基数，字母A代表11，B代表12
:::

```js
function baseConverter(num, base) {
	const stack = new Stack();
	const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVMXYZ'; 
	let binaryNum = '';
	let rem = 0

	if (base < 2 || base > 36) {
		return '';
	}
	while(num > 0) {
		rem = Math.floor(num % base);
		stack.push(rem);
		num = Math.floor(num / base);
	}

	while(!stack.isEmpty()) {
		binaryNum += digits[stack.pop()];
	}
	return binaryNum;
}
```

### 平衡圆括号

```js
// @ts-check
import Stack from '../data-structures/stack';

export function parenthesesChecker(symbols) {
  const stack = new Stack();
  const opens = '([{';
  const closers = ')]}';
  let balanced = true;
  let index = 0;
  let symbol;
  let top;

  while (index < symbols.length && balanced) {
    symbol = symbols[index];
    if (opens.indexOf(symbol) >= 0) {
      stack.push(symbol);
    } else if (stack.isEmpty()) {
      balanced = false;
    } else {
      top = stack.pop();
      if (!(opens.indexOf(top) === closers.indexOf(symbol))) {
        balanced = false;
      }
    }
    index++;
  }
  return balanced && stack.isEmpty();
}
```

:::tip
The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
:::

### 汉诺塔

