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

