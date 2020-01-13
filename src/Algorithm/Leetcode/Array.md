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
`end: [1, 1, 2, 2, 3]` <br>
<span style="padding-left:200px">`c`</span><br>
<span style="padding-left:220px">`i`</span><br>
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