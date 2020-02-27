# Recursive

## 斐波那契数列

![img](~@pic/img/fib1.png)

每一个节点都是一次运算，所以可以看到有很多重复的计算，所以我们需要一个memory来避免重复运算，来让时间复杂度从O(2^n)到O(2n - 1)
所以又称为记忆化搜索(自上而下的解决问题)动归是自下而上的解决问题, [动归解法](./dp.md)

### C++
```cpp
using namespace std;
vector<int> memo;
int num = 0;

int fib( int n ) {
  num++;

  if (n <= 0 ) {
    return 0;
  }

  if (n == 1) {
    return 1;
  }

  if (memo[n] == -1) {
    memo[n] = fib(n - 1) + fib(n - 2);
  }
  return memo[n];
}

int main() {

  num = 0;

  int n = 40;
  memo = vector<int>(n + 1, -1);
  time_t startTime = clock();
  int res = fib(n);
  time_t endTime = clock();

  cout<<"fib("<<n<<") = "<<res<<endl;
}
```

### Javascript
```js
const memorize = (fn) => {

  const cache = {};
  // ...args 表明无论fn有多少arguments，获得他们并且assign给args array
  return function(...args) {
    if (cache[args]) {
      return cache[args];
    }

    const result = fn.apply(this. args);
    cache[args] = result;

    return result;
  }
}

const slowFib = (n) => {
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

const fib = memorize(slowFib);
```
:::tip
<Link hrefUrl="https://javascript.info/object" text="JS object computed properties"></Link>
:::