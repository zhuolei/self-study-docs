# Dynamic programming

![img](~@pic/img/fib2.png)
将原问题拆解成若干子问题，同时保存子问题的答案，使得每个子问题之求解一次
## 斐波那契数列

动归是更优解，因为递归函数调用是有额外空间开销的
```cpp
int fib( int n ) {
  vector<int> memo(n + 1, -1);

  memo[0] = 0;
  memo[1] = 1;
  for(int i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }

  return memo[n];
}
```

## Longest Common Substring

Given two strings ‘X’ and ‘Y’, find the length of the longest common substring.

**Examples:**

<Codeblock>
<p>
Input : X = “GeeksforGeeks”, y = “GeeksQuiz”<br>
Output : 5<br>
The longest common substring is “Geeks” and is of length 5.<br>

Input : X = “abcdxyz”, y = “xyzabcd”<br>
Output : 4<br>
The longest common substring is “abcd” and is of length 4.<br>

Input : X = “zxabcdezy”, y = “yzabcdezx”<br>
Output : 6<br>
The longest common substring is “abcdez” and is of length 6.<br>
</p>
</Codeblock>

**思路**

设有两字符串A,B，构建状态数组`dp[A.length][B.length]`
设dp[i][j]为A[0…i], B[0…j]的最长公共子串，且满足X[i] = Y[i]。
则有：
1. `X[i] == Y[j]，dp[i][j] = dp[i-1][j-1] + 1`
2. `X[i] != Y[j]，dp[i][j] = 0`

对于2,显然根据定义即可得。
对于1，根据定义，dp[i-1][j-1]是A[0…i-1],B[0….j-1]的以A[i-1],B[j-1]结尾的最长公共子串，当1条件满足，显然后面的等式成立。
一旦出现公共子串（包括一个字符相等），我们都将其和一个全局最长子串长度比较，则全部遍历下来，相当于求出了所有公共子串的长度，并从其中取得了最大值，问题得解。

```java
// 严格的说，这个算法是递推，而不是动态规划，但是可以用动态规划的四要素去分析换个解答。
// 为什么不是动态规划？因为最暴力的方式也就是 O(n^3) 可以找到A所有的Substring然后看看在不在B里。
public class Solution {
    /**
     * @param A, B: Two string.
     * @return: the length of the longest common substring.
     */
    public int longestCommonSubstring(String A, String B) {
        // state: f[i][j] is the length of the longest lcs
        // ended with A[i - 1] & B[j - 1] in A[0..i-1] & B[0..j-1]
        int n = A.length();
        int m = B.length();
        int[][] f = new int[n + 1][m + 1];
        
        // initialize: f[i][j] is 0 by default
        
        // function: f[i][j] = f[i - 1][j - 1] + 1 or 0
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (A.charAt(i - 1) == B.charAt(j - 1)) {
                    f[i][j] = f[i - 1][j - 1] + 1;
                } else {
                    f[i][j] = 0;
                }
            }
        }
        
        // answer: max{f[i][j]}
        int max = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                max = Math.max(max, f[i][j]);
            }
        }
        
        return max;
    }
}
```