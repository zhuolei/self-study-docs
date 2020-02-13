# Math

## 对于任意一个整数，求各个位数上的数字之和。

输入格式：
输入一行，只有1个整数

输出格式
输出只有一行，1个整数

### C++

```cpp
# include <cmath>

int main() {
  int sum, num = 0;
  cin >> num;
  while(num > 0) {
    sum += num % 10;
    num = num / 10;
  }
  // num有可能是负数
  cout << abs(sum) << endl;
}
```

## 给一个整数，将这个数颠倒后输出

输入格式：
输入一行，一个整数（可能为负）

输出格式：
输出一行，一个整数

样例： 输入1233 输出3321 输入-123 输出-321

```cpp

int main() {
  
}
```