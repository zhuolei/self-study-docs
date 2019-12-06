# Javascript Weird Part 

## Negative or string index in js array
js array don't have negative or string index, the negative number is stored as key-value pair, array are behaving like object we can use `for(let key in arr)` to go through it

```js
const arr = [1, 2, 3]

arr[-1] = 0
arr.a = 4
arr['hikey'] = 'hivalue'

console.log(arr);
```

object can act like array, but it doesn't have length

## Best way initialize array
**use [] not new Array()**
::: tip
[] is an array literal. It is not quite the same as declaring new Array() - the Array object can be overwritten in JavaScript, but the array literal can't. Here's an example to demonstrate
:::

```js
// let's overwrite the Array object
Array = function(id) {
 this.id = id;
}

var a = new Array(1);
var b = [];

console.log(a.hasOwnProperty("id")); // true
console.log(b.hasOwnProperty("id")); // false

console.log(a.push); // false, push doesn't exist on a
console.log(b.push); // true,  but it does on b

b.push(2);
console.log(b); // outputs [2]
```

And also `new Array(5) != [5]`, `new Array(5)` means create an array `[empty * 5]` and initialize it so that there are 5 empty entrie, it cannot use forEach because it is empty not real array.

But `new Array(2, 5) == [2, 5]`
