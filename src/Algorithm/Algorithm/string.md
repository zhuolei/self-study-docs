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

## Longest Common Ending

Write a function that returns the longest common ending between two strings

**Examples**

`LongestCommonEnding("Multiplication", "ration") => "ation"`

```js
const lce = (s1, s2) => {
  const a1 = [ ...s1 ]; //'str' => ['s', 't', 'r']
  const a2 = [ ...s2 ];

  let res = [];
  while(a1.length && a2.length) {
    if (a1[a1.length - 1] !== a2[a2.length - 1]) {
      return res;
    } else {
      a2.pop();
      res.unshift(a1.pop());
    }
  }

  return res.join('');
}
```