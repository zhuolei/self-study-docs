# Array

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