# Stack

## 栈的应用场景

所有要后进先出的场景

- 十进制转二进制
![img](~@pic/img/stack1.png)
- 判断字符串的括号是否有效
![img](~@pic/img/stack2.png)
- 函数调用堆栈
![img](~@pic/img/stack3.png)

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
