# Array

## Remove Even Integers From an Array

Implement a function that​ removes all the even elements from a given array. 

**Input** 
An array with random integers.

**Output**
An array with only odd integers

```js
// Name it removeEven(arr).
const removeEven = (arr) => {
  return arr.filter(a => a % 2 !== 0);
}
```

## Merge two sorted Array

Implement a function which merges two sorted arrays into another sorted array.

**Input:**
Two sorted arrays.

**Output:**
A merged sorted array consisting of all elements of both input arrays.


```js
// O(nlog(n))
const mergeArrays = (arr1, arr2) => {
  return [...arr1, ...arr2].sort((a, b) => a - b);
}

// O(m + n)
const mergeArrays = (arr1, arr2) => {
  const r = [];
  let i = 0, j = 0;

  while ((i < arr1.length) && (j < arr2.length)) {
    if (arr1[i] < arr2[j]) {
      r.push(arr1[i]);
      i++;
    } else {
      r.push(arr2[j]);
      j++;
    }
  }

  if (i <= arr1.length - 1) {
    arr1.slice(0, i);
    r.push(...arr1);
  } else if (j <= arr2.length - 1) {
    arr2.slice(0, j);
    r.push(...arr2);
  }
  return r;
}
```