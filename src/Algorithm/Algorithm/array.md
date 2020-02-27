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

## Concatenate to Form Target Array (flatten array)

Create a function that returns true if smaller arrays can concatenate to form the target array and false otherwise

**Examples:**

<Codeblock>
<p>
canConcatenate([[1,2,3], [4], [5]], [1,2,3,4,5]) -> true<br>
canConcatenate([[2,1,3], [4,5]], [5,4,3,2,1]) -> true<br>
canConcatenate([[1,2,3], [4,5,5]], [5,4,3,2,1]) -> false<br>
canConcatenate([[1,2,3], [4]], [5,4,3,2,1]) -> false<br>
</p>
</Codeblock>

**Notes**
- Arrays do not have to be sorted(see example2)
- Arrays should concatenate to create the final array exactly(see examples #3 and #4)

See [how to flatten array](../../Interview/Senario/Javascript.md#how-to-flatten-array)

```js
const canConcatenate = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }
  const arr3 = arr1.reduce((acc, itm) => {
    acc.push(...itm);
    return acc;
  }, []);

  return arr3.sort().join('') === arr2.sort().join('');
}
```
