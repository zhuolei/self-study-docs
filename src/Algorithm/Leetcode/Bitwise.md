# Bitwise

## Basic

### 201. Bitwise AND of Numbers Range
<a href="https://leetcode.com/problems/bitwise-and-of-numbers-range/" target="_blank">Link</a>

Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this range, inclusive.

**Example 1:**

<Codeblock>
<p>
Input: [5,7]<br>
Output: 4<br>
</p>
</Codeblock>

**Example 2:**

<Codeblock>
<p>
Input: [0,1]<br>
Output: 0<br>
</p>
</Codeblock>

笔记：当一个数+1时，总会有这么一个规律“某一位后的数字，全部被置为相反数”。举个例子：

- 010111 + 1 = 011000，则010111 & 011000 = 010000。那么，x & (x+1) 后几位相反数的“与操作”，结果总为0。

所以，当(m,m+1,...n-1,n)进行连续“与操作”时，会按照上述规律被抵消很大一部分，而只剩下n的前缀部分，最后只需将n归位。举个例子：

- m = 5(0101), n = 7 (0111)。不停右移，得到n前缀部分为01，最后归位前缀得res=0100=4

```js
const rangeBitwiseAnd = (m, n) => {
  let offset = 0;
  for (;m !== n; offset++) {
    m >>= 1;
    n >>= 1;
  }
  return n << offset;
}
```

:::tip
按位操作符（Bitwise operators） 将其操作数（operands）当作32位的比特序列（由0和1组成），而不是十进制、十六进制或八进制数值。例如，十进制数9，用二进制表示则为1001。按位操作符操作数字的二进制形式，但是返回值依然是标准的JavaScript数值。
![img](~@pic/img/leetcode_201.png)
:::