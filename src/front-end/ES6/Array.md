# Array

### For loop
`es5`
```js
var arr = [1, 2, 3, 4, 5];
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// forEach don't support break continue
arr.forEach(function (itm) {
  console.log(itm);
});

[1, 2, 3].forEach(function (itm) {
  console.log(itm)
})

arr.every(function (item) {
  if (item == 2) return false; // like break
  console.log(item);
  // .every use return value to determine continue loop or not, default is false 
  return true; 
});

// for in is design for object not recommend for array
// because array is also a object
arr.a = 8
for (let index in arr) {
  // index is string
  if (index == 2) continue; 
  // or 
  if (index * 1 === 3) break;
  console.log(index, arr[index])
}
```
ES6 introduce for of to iterate array or object or other datastructure
`es6`
```js
for (let item of arr) {
  console.log(item)
}

const Price = {
  A: [1.5, 2.3, 4.5],
  B: [3, 4, 5],
  C: [0.5, 0.8, 1.2]
}

for (let p in Price) {
  console.log(p);
}
```

## Array.from
Array static method from
How to tranform arraylike object to array

::: tip
ArrayLike object is an Object which has a length property of a non-negative Integer, and usually some indexed properties `var ao1 = {length: 0}, ao2 = {0: 'foo', 5: 'bar', length: 6}` 
:::
`es5`
```js
function A (a, b) {
	let args = [].slice.call(arguments);
	console.log(Array.isArray(args))
}
A(1, 2);

let imgs = [].slice.call(document.querySelectorAll('img'))
console.log(args)
```

`es6`
```js
// Array.from(arrayLike, mapFn, thisArg)
let args = Array.from(arguments)
let imgs = Array.from(document.querySelectorAll('img'))

let array = Array.from({ length: 5 }, function() { return 1 }) // [1, 1, 1, 1, 1]
```
The `Array.from()` method creates a new, shallow-copied Array instance from an array-like or iterable object. `static` methods such as `Array.from` are "inherited" by subclasses of Array and create new instances of the subclass, not Array.

## Array.of
`Array.prototype.of` to create a new Array
The `Array.of()` method creates a new Array instance from a variable number of arguments, regardless of number or type of the arguments.
```js
let array = Array.of(1, 2, 3, 4)
```

::: tip
<a href="https://stackoverflow.com/questions/39952602/array-of-vs-when-to-use-array-of-over">Why we need Array.of</a>
:::

## Array.fill
Array.prototype.fill

Array.fill(value, start, end)
```js
let array = Array(3).fill(7) // [3, 3, 3]
[1, 2, 3, 4, 5].fill(8, 2, 4) // [1, 2, 8, 8, 5]
```

### Polyfill

```js
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}
```

## Array.find
Array.prototype.find

The `find()` method returns the value of the first element in the provided array that satisfies the provided testing function, otherwise, undefined is returned.

- If you need the index of the found element in the array, use `findIndex()`.
- If you need to find the index of a value, use `Array.prototype.indexOf()`. (It’s similar to findIndex(), but checks each element for equality with the value instead of using a testing function.)
- If you need to find if a value exists in an array, use `Array.prototype.includes()`.

```js
let find = [1, 2, 3].find((i) => {
  return i === 3;
});
```

### Polyfill
```js
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}
```