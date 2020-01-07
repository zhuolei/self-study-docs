# Algorithm Basic

## Space & Time Complexity 

### Space Complexity
How much memory is used?

### Time Complexity
Hom much primitive operations are executed?

::: tip
with respect to input size<br>
and assuming worst case scenario
:::

| **Name** | constant | logarithmic | linear | quadratic | exponential |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| **Notation** | O(1) | O(logn) | O(n) | O(n^2) | O(k^n) |

### Native API
#### JS
- map/linear/shift()/unshift() in their core linear time
- push/ constant
- sort nlog(n) (it depends)
- .length is just a property lookup, so is constant time

## Unique Sort

```js
const uniqSort = (arr) => {
  const cache = {};
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (!cache[arr[i]]) {
      result.push(arr[i]);
      cache[arr[i]] = true;
    }
  }
  return result.sort((a, b) => a - b);
}
```

## Memoization

**Example**

Task 1: Write a function, times10, that takes an argument, n, and multiples n times n

```js
const times10 = (n) => (n * 10);
```
Task 2: Use an object to cache the result of your times10 function
- tip 1: Create a function that checks if the value for n has been calculated before
- tip 2: If the value for n has not been calculated, calculate and then save the result in the cache object

```js
const cache = {};

const memoTimes10 = (n) => {
  if (n in cache) {
    return cache[n];
  } else {
    let result = times10(n);
    cache[n] = result;
    return result;
  }
}
```

Task 3: Clean up your global