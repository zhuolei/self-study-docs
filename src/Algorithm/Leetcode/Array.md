# Array

## 27. Remove Element (Two pointer)

Given an array nums and a value val, remove all instances of that value in-place and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

**Example 1:**

<Codeblock>
<p>
Given nums = [3,2,2,3], val = 3,<br>
Your function should return length = 2, with the first two elements of nums being 2.<br>
It doesn't matter what you leave beyond the returned length.<br>
</p>
</Codeblock>

**Example 2:**

<Codeblock>
<p>
Given nums = [0,1,2,2,3,0,4,2], val = 2,<br>
Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.<br>
Note that the order of those five elements can be arbitrary.<br>
It doesn't matter what you leave beyond the returned length.<br>
</p>
</Codeblock>

:::tip
Two pointer <br>
`start: [3, 2, 2, 3]  val = 3` <br>
`end: [2, 2, 2, 3]` <br>
<span style="padding-left:100px">`r`</span><br>
<span style="padding-left:120px">`i`</span><br>
Time: 0(n) <br>
Space: 0(1)
:::

```java
public class Solution {
  public int removeElement(int[] nums, int val) {
    if (nums == null || nums.length == 0) return 0;
    int res = 0;
    for (int i = 0; i < nums.length; i++) {
      // 如果相等i前进, r不变
      if (nums[i] != val) {
        //因为最后是返回length所以res++ 代表先res位置赋值再加一
        nums[res++] = nums[i];
      }
    }
    return res;
  }
}
```

## 26. Remove Duplicates from Sorted Array (Two pointer)
Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.

Do not allocate extra space for another array, you must do this by **modifying the input array in-place** with O(1) extra memory.

**Example 1:**

<Codeblock>
<p>
Given nums = [1,1,2],<br>
Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.<br>
It doesn't matter what you leave beyond the returned length.<br>
</p>
</Codeblock>

**Example 2:**

<Codeblock>
<p>
Given nums = [0,0,1,1,1,2,2,3,3,4],<br>
Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.<br>
It doesn't matter what you leave beyond the returned length.<br>
</p>
</Codeblock>

:::tip
把此题和remove duplicate from sorted list 比较
Two pointer <br>
`start: [1, 1, 2, 2, 3, 4, 5, 6]` <br>
`end: [1, 2, 3, 4, 5, 6, 5, 6]` <br>
<span style="padding-left:200px">`c`</span><br>
<span style="padding-left:220px">`i`</span><br>
Time: 0(n) <br>
Space: 0(1)
:::

```java
public class Solution {
  public int removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) return 0;
    // 因为是去重，第一个肯定保留，所以count初始值为1, i也从1开始
    int count = 1;
    for (int i = 1; i < nums.length; i++) {
      // 这里i - 1也可以用count - 1， 因为count - 1代表的是已经完工的array,有点selection sort的意味
      if (nums[i - 1] != nums[i]) {
        nums[count++] = nums[i];
      }
    }
    return count;
  }
}
```

## 80. Remove Duplicates from Sorted Array II

Given a sorted array nums, remove the duplicates in-place such that duplicates appeared at most twice and return the new length.

Do not allocate extra space for another array, you must do this by **modifying the input array in-place** with O(1) extra memory.

**Example 1:**

<Codeblock>
<p>
Given nums = [1,1,1,2,2,3],<br>
Your function should return length = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.<br>
It doesn't matter what you leave beyond the returned length.<br>
</p>
</Codeblock>

**Example 2:**

<Codeblock>
<p>
Given nums = [0,0,1,1,1,1,2,3,3],<br>
Your function should return length = 7, with the first seven elements of nums being modified to 0, 0, 1, 1, 2, 3 and 3 respectively.<br>
It doesn't matter what you leave beyond the returned length.<br>
</p>
</Codeblock>

:::tip
和26题做法相同<br>
Two pointer <br>
`start: [1, 1, 1, 2, 2, 3]` <br>
`end: [1, 1, 2, 2, 3, 3]` <br>
<span style="padding-left:170px">`c`</span><br>
<span style="padding-left:200px">`i`</span><br>
Time: 0(n) <br>
Space: 0(1)
:::

```java
public class Solution {
  public int removeDuplicates(int[] nums) {
    if (nums == null || nums.length == 0) return 0;
    // 因为保留两个相同的所以count = 2
    int count = 2;
    for (int i = 2; i < nums.length; i++) {
      // 注意这里是count - 2, 其实26题也是count - 1, 只不过用i比较方便
      // count之前是保留的数组, count所在位置是即将插入的元素所在的位置
      if (nums[i] != nums[count - 2]) {
        nums[count++] = nums[i];
      }
    }
    return count;
  }
}
```

## 277. Find the Celebrity

Suppose you are at a party with n people (labeled from `0` to `n - 1`) and among them, there may exist one celebrity. The definition of a celebrity is that all the other `n - 1` people know him/her but he/she does not know any of them.

Now you want to find out who the celebrity is or verify that there is not one. The only thing you are allowed to do is to ask questions like: "Hi, A. Do you know B?" to get information of whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).

You are given a helper function `bool knows(a, b)` which tells you whether A knows B. Implement a function int findCelebrity(n). There will be exactly one celebrity if he/she is in the party. Return the celebrity's label if there is a celebrity in the party. If there is no celebrity, return `-1`.

**Example 1:**

<Codeblock>
![img](~@algorithm/img/277_example_1_bold.png)
<p>
Input: graph = [ <br>
  [1,1,0],<br>
  [0,1,0],<br>
  [1,1,1]<br>
]<br>
Output: 1 <br>
Explanation: There are three persons labeled with 0, 1 and 2. graph[i][j] = 1 means person i knows person j, otherwise graph[i][j] = 0 means person i does not know person j. The celebrity is the person labeled as 1 because both 0 and 2 know him but 1 does not know anybody.
</p>
</Codeblock>

**Example 2:**

<Codeblock>
![img](~@algorithm/img/277_example_2.png)
<p>
Input: graph = [ <br>
  [1,0,1], <br>
  [1,1,0], <br>
  [0,1,1] <br>
] <br>
Output: -1 <br>
Explanation: There is no celebrity. <br>
</p>
</Codeblock>

**Note:**

- The directed graph is represented as an adjacency matrix, which is an n x n matrix where `a[i][j] = 1` means person i knows person j while `a[i][j] = 0` means the contrary.
- Remember that you won't have direct access to the adjacency matrix.

```java
/* The knows API is defined in the parent class Relation. boolean knows(int a, int b); */
public class Solution extends Relation {
   public int findCelebrity(int n) {
      if (n < 2) return -1;

      int candidate = 0;
      for (int i = 1; i < n; i++) {
        //基于名人不认识所有人而所有人认识名人
        //所以只要candiate认识i就说明candiate不可能是名人，所以把i赋值给candiate,这里是因为有且仅有一个名人
        if (knows(candidate, i)) {
          candidate = i;
        }
      }
      for (int i = 0; i < n; i++) {
        // candiate != i 把名人本身去掉
        // knows(candidate, i) 如果candiate 认识某人说明不是名人
        // !knows(i, candidate) 如果某人不认识candiate也说明他不是名人
        if (candidate != i && (knows(candidate, i) || !knows(i, candidate))) {
          return -1;
        }
      }
      return candiate;
   }
}
```

## 189. Rotate Array

Given an array, rotate the array to the right by k steps, where k is non-negative.

**Example 1:**

<Codeblock>
<p>
Input: [1,2,3,4,5,6,7] and k = 3<br>
Output: [5,6,7,1,2,3,4]<br>
Explanation:<br>
rotate 1 steps to the right: [7,1,2,3,4,5,6]<br>
rotate 2 steps to the right: [6,7,1,2,3,4,5]<br>
rotate 3 steps to the right: [5,6,7,1,2,3,4]<br>
</p>
</Codeblock>

**Example 2:**

<Codeblock>
<p>
Input: [-1,-100,3,99] and k = 2<br>
Output: [3,99,-1,-100]<br>
Explanation:<br>
rotate 1 steps to the right: [99,-1,-100,3]<br>
rotate 2 steps to the right: [3,99,-1,-100]<br>
</p>
</Codeblock>

**Note:**

- Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
- Could you do it in-place with O(1) extra space?

```java
class Solution {
  // solution1
  // time: 0(n) space: 0(n)
  // [1, 2, 3, 4, 5, 6, 7] k = 3
  // 0 + 3 % 7 = 3
  // [         1  2  3  4]
  public void rotate(int[] nums, int k) {
      int temp = new int[nums.length];
      // 用取模的方法来找到数组里面各位数新的位置并将其存到temp数组里
      for (int i = 0; i < nums.length; i++) {
        temp[(i + k) % nums.length] = nums[i];
      }
      // 把temp数组重新赋值给回nums
      for (int i = 0; i < nums.length; i++) {
        nums[i] = temp[i];
      }
  }
  // solution2
  // time: 0(n) space: 0(1)
  // [1, 2, 3, 4, 5, 6, 7] k = 3
  // 用三层翻转法
  // 1. reverse all nums:      7 6 5 4 3 2 1
  // 2. reverse nums before k: 5 6 7 4 3 2 1
  // 3. reverse nums after k:  5 6 7 1 2 3 4
  public void rotate2(int[] nums, int k) {
    k % nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1)
  }
  public void reverse(int[] nums, int start, int end) {
    while(start < end) {
      int temp = nums[start];
      nums[start] = nums[end];
      nums[end] = temp;
      start++;
      end--;
    }
  }
}
```

## 41. First Missing Positive

Given an unsorted integer array, find the smallest missing positive integer.

**Example 1:**

<Codeblock>
<p>
Input: [1,2,0]<br>
Output: 3<br>
</p>
</Codeblock>

**Example 2:**

<Codeblock>
<p>
Input: [3,4,-1,1]<br>
Output: 2<br>
</p>
</Codeblock>

**Example 3:**

<Codeblock>
<p>
Input: [7,8,9,11,12]<br>
Output: 1<br>
</p>
</Codeblock>

**Note:**

Your algorithm should run in O(n) time and uses constant extra space.

```java
class Solution {
  // 注意第三个例子里1是最小的正整数
  // 如果[1, 2, 3, 4]这里最小的应该是5
  // 用到bucket sort理念
  // 正常来说一个不missing的数组每个item = index + 1;
  // [0, 1, 2, 3]
  // [1, 2, 3, 4]
  public int firstMissingPositive(int[] nums) {
    if (nums == null || nums.length == 0) return 1;
    for (int i = 0; i < nums.length; i++) {
      // nums[nums[i] - 1] != nums[i] 是应用桶排序的理念把nums[i]的值放到相对应的桶里去就是item - 1 = index;
      // 举个例子为什么用while
      //         [3, 1, 4, -1]
      // 换第一次 [4, 1, 3, -1]
      //         [1, -1, 3, 4]
      // 如果是if的话就只换一次就不换了，所以要用while换到不满足while入口条件为止
      // 换到最后是[1, -1, 3, 4]
      while (nums[i] > 0 && nums[i] <= nums.length && nums[nums[i] - 1] != nums[i]) {
        int temp = nums[nums[i] - 1];
        nums[nums[i] - 1] = nums[i];
        nums[i] = temp;
      }
    }
    for (int i = 0; i < nums.length; i++) {
      // 返回第一个missing number
      if (nums[i] != i + 1) {
        return i + 1;
      }
    }
    // 这里考虑到的情况是[1, 2, 3, 4]所以返回5
    return nums.length + 1;
  }
}
```

## 268. Missing Number

Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

**Example 1:**

<Codeblock>
<p>
Input: [3,0,1]<br>
Output: 2<br>
</p>
</Codeblock>

**Example 2:**

<Codeblock>
<p>
Input: [9,6,4,2,3,5,7,0,1]<br>
Output: 8<br>
</p>
</Codeblock>

**Note:**
Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?


```js
const missingNum = (nums) => {
  let len = nums.length;//length of array.
  let sum = (len*(len+1))/2; // sum of all nos from 0 to n by series formula (Gaussian sum)
  let sum2 = nums.reduce((a,c)=> a+c); //sum of array elements.
  return sum-sum2; //difference is the answer
}

const missingNum = (nums) => {
  return nums.reduce((acc,itm, i) => acc + i - itm, 0) + nums.length;
}

var missingNumber = function(nums) {
    nums.sort((a,b)=>a-b);
    var val = nums.findIndex((val, index + 1)=> val != index);
    return val == -1 ? nums.length + 1  : val;
};

```

```java
public int missingNumber(int[] nums) {
  int res = 0;
}
```

**Follow up**

What if input is [1, 2, 3, 4, 5], output is 6?