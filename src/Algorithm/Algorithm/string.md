# String

## How to count string occurrence in string?

### JS
```js
// without overlap
const count = (str, subStr) => {
  if (subStr.length === 0) return str.length + 1;
  let reg = new RegExp(subStr, 'gi');
  return (str.match(reg) || '').length;
}

const count = (str, subStr, allowOverlap) => {
  str += ''; // or str = (str + '').toLowerCase();
  subStr += '';
  if (subStr.length <= 0) return (str.length + 1);

  let n = 0, 
      pos = 0, 
      step = allowOverlap ? 1 : subStr.length;
  
  while (true) {

  }
}
```

## Find the Missing Number

You are given a list of n-1 integers and these integers are in the range of 1 to n. There are no duplicates in the list. One of the integers is missing in the list. Write an efficient code to find the missing integer.
(Or Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.)
