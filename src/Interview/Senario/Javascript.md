# Javascript

## How to merge two array

`arr1.push(...arr2)` or `Array.prototype.push.apply(a1, a2)` is faster than `arr1.concat(arr2)` concat is 0(n2) and push is 0(n)

::: tip
<a href="https://dev.to/uilicious/javascript-array-push-is-945x-faster-than-array-concat-1oki">Javascript Array.push is 945x faster than Array.concat</a>
:::

## Round up to the next mutiple of 5

```js
function round5(x) {
  return Math.ceil(x / 5) * 5;
}
```

## How to round time to nearest mutiple of 5 minute

```js
function roundTimeQuarterHour(time) {
    var timeToReturn = new Date(time);
    // 当setSeconds(60)时会进位,所以下面两行没必要(说错了有必要)
    timeToReturn.setMilliseconds(Math.ceil(timeToReturn.getMilliseconds() / 1000) * 1000);
    timeToReturn.setSeconds(Math.ceil(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.ceil(timeToReturn.getMinutes() / 5) * 5);
    return timeToReturn;
}
```

:::tip
more detail <a href="https://stackoverflow.com/questions/4968250/how-to-round-time-to-the-nearest-quarter-hour-in-javascript/4968292" target="_blank">here</a>
:::

## Format Date

`format-date.js`
```js
export default function(timestamp, userOption = {}, locale = 'en-US') {
  const date = new Date(timestamp);
  const options = { localeMatcher: 'best fit', year: 'numeric', month: 'long', day: 'numeric', ...userOptions }

  return date.toLocaleDateString(locale, options);
}
```

## How to Flatten Array

### For..of
```js
function flattern(arr, result = []) {
  for (let itm of arr) {
    if (Array.isArray(itm)) {
      flattern(itm, result);
    } else {
      result.push(itm);
    }
  }

  return result;
}
```

### reduce
```js
function flatten(arr) {
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flatten(val) : val);
  }, []);
}

```

### forEach
```js
function flatten(arr) {
  const result = []

  arr.forEach((i) => {
    if (Array.isArray(i)) {
      result.push(...flatten(i))
    } else {
      result.push(i)
    }
  })
  
  return result
}

```

:::tip
<a href="https://www.jianshu.com/p/b1fb3434e1f5">More</a>
:::

## How to Flatten/Unflatten Object

### version 1

Before flatten
```json
{
  "prop1": {
    "prop1_1": 1,
    "prop1_2": "second",
    "prop1_3": [3, 4],
  },
  "prop2": {
    "prop2_1": [
      {
        "prop2_2": "1",
      },
      {
        "prop2_3": "3",
      }
    ],
  }
}
```
After flatten
```json
{
  "prop1.prop1_1": 1,
  "prop1.prop1_2": "second",
  "prop1.prop1_3[0]": 3,
  "prop1.prop1_3[1]": 4,
  "prop2.prop2_1[0].prop2_2": "1",
  "prop2.prop2_1[1].prop2_3": "3",
}
```


#### Flatten

```js
function flatten(obj) {
  const merge = objs => {
    const out = {};
    objs.forEach(obj => {
      Object.keys(obj).forEach(key => {
        out[key] = obj[key];
      })
    })

    return out;
  }

  // recursive
  const flattenHelper = (value, key, item, isArray = false) => {
    let out = {};

    let newItem = key;
    if (typeof item !== 'undefined' && item !== '') {
      if (isArray) {
        newItem = `${item}[${key}]`;
      } else {
        newItem = `${item}.${key}`;
      }
    }

    if (typeof value !== 'object' || value === null) {
      out[newItem] = value;
      return out;
    }

    Object.keys(value).forEach(key => {
      const isArray = Array.isArray(value);
      const prop = flattenHelper(value[key], key, newItem, isArray);
      out = merge([out, prop]);
    })

    return out;
  }

  return flattenHelper(obj);
}
```

#### Unflatten


## Debounce && Throttle

- throttle：将一个函数的调用频率限制在一定阈值内，例如 1s 内一个函数不能被调用两次。debounce：当调用函数n秒后，才会执行该动作，若在这n秒内又调用该函数则将取消前一次并重新计算执行时间，举个简单的例子，我们要根据用户输入做suggest，每当用户按下键盘的时候都可以取消前一次，并且只关心最后一次输入的时间就行了。
 
- This functionality is frequently controlled by a function called a debounce (it could also be a throttle function which has a similar outcome). The debounce function delays the processing of the keyup event until the user has stopped typing for a predetermined amount of time. This prevents your UI code from needing to process every event and also drastically reduces the number of API calls sent to your server. Processing every character as it’s entered could harm performance and add unnecessary load to your server.

```js
function debounce3(fn, delay) {
  var timer
  // 返回一个函数,这个函数会在一个时间区间结束后的delay毫秒时执行fn函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给fn
    var context = this;
    var args = argments;
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行fn
    clearTimeout(timer);
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过delay毫秒就执行fn
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}

window.addEventListener('resize', debounce)

// another example
export default function debounce(fn, delay) {
  let id = null;
  return function dbc(...args) {
    clearTimeout(id);
    const that = this;
    id = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  }
}
```

## Format date

`format-date.js`
```js
export default function(timestamp, userOptions = {}, locale = 'en-US') {
  const date = new Date(timestamp);
  const options = { localeMatcher: 'best fit', year: 'numeric', month: 'long', day: 'numeric', ...userOptions };

  return date.toLocalDateString(locale, options);
}
```
`import formatDate from './format-date.js'`

## import different modules

`importer.js`
```js
export default (...modules) => Promise.all(
  // flatten arguments to enable both
  // imports([m1, m2]) or imports(m1, m2)
  modules.concat.apply([], modules)
  // asynchronously await each module returning its default
  .map(async m => (await m).default)
);
```

`Vue` `main.js`
```js
const isClient = window.location.pathname === '/js-client-test';
  const imports = isClient
    ? [
      import('./router-client.js'),
      import('./PublicApp.vue'),
    ]
    : [
      import('./router-admin.js'),
      import('./App.vue'),
    ];

  const [router, App] = await importer(imports);
```

## 如何执行多个promise

await Promise.all()

### 如何按顺序执行多个promise

use for loop or for each

## How to Capitalize the first letter of a string

```js
const cp = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

## How to find value based on object key

```js
locales = ['pt', 'es', 'de', 'fr', 'ja', 'en'];
const urlList = locales.map(x => ({[x]: 'http://google.com'}))

//  [{…}, {…}, {…}, {…}, {…}, {…}]
// 0: {pt: "http://google.com"}
// 1: {es: "http://google.com"}
// 2: {de: "http://google.com"}
// 3: {fr: "http://google.com"}
// 4: {ja: "http://google.com"}
// 5: {en: "http://google.com"}

const locale = 'en'
const obj = urlList.find(x => locale in x);
```

## How to check is js object empty?

```js
export const isObjectEmpty = obj => !obj ? true : Object.keys(obj).length === 0 && obj.constructor === object;
```

## How to check a value is object

### with `Array.isArray`
```js
function isObject(o) {
  return o !== null && typeof o === 'object' && Array.isArray(o) === false;
}
```

### without `Array.isArray`
```js
function isObject(o) {
  return o instanceof Object && o.constructor === Object;
}
```

result:
```js
console.log(isObject({}));             // Will return: true
console.log(isObject([]));             // Will return: false
console.log(isObject(null));           // Will return: false
console.log(isObject(/.*/));           // Will return: false
console.log(isObject(function () {})); // Will return: false
```

In case you need to verify that object is instance of particular class you have to check constructor with your particular class, like:

```js
function isDate(o) {
  return o instanceof Object && o.constructor === Date;
}

var d = new Date();
console.log(isObject(d)); // Will return: false
console.log(isDate(d));   // Will return: true
```

In case you won't create functions like isDate, isError, isRegExp, etc you may consider option to use this generalized functions:

```js
function isFunction(o) {
  return o instanceof Object && typeof o.constructor === 'function';
}
```

`isObject` won't work in case of `Object.create(null)` because of internal implementation of Object.create which is explained here but you can use isObject in more sophisticated implementation:

```js
function isObject(o, strict = true) {
  if (o === null || o === undefined) {
    return false;
  }
  const instanceOfObject = o instanceof Object;
  const typeOfObject = typeof o === 'object';
  const constructorUndefined = o.constructor === undefined;
  const constructorObject = o.constructor === Object;
  const typeOfConstructorObject = typeof o.constructor === 'function';
  let r;
  if (strict === true) {
    r = (instanceOfObject || typeOfObject) && (constructorUndefined || constructorObject);
  } else {
    r = (constructorUndefined || typeOfConstructorObject); //存疑
  }
  return r;
};
```

## How to check if an Object has Property

### hasOwnProperty
The method name `hasOwnProperty()` suggests that it looks in the own properties of the object. The own properties are those defined directly upon the object.
```js
const hero = {
  name: 'Batman'
};

hero.hasOwnProperty('name');     // => true
hero.hasOwnProperty('realName'); // => false

const hero = {
  name: 'Batman'
};

hero.toString; // => function() {...}

hero.hasOwnProperty('toString'); // => false
```

### in operator

```js
const hero = {
  name: 'Batman'
};

'name' in hero;     // => true
'realName' in hero; // => false
```

The main difference between hasOwnProperty() method and in operator is that the latter checks within own and inherited properties of the object.

That’s why, in contrast to `hasOwnProperty()`, the in operator detects that hero object contains the inherited property toString:

```js
const hero = {
  name: 'Batman'
};

hero.toString; // => function() {...}

'toString' in hero;              // => true
hero.hasOwnProperty('toString'); // => false
```

It depends on what you're looking for. If you want to know if an object physically contains a property (and it is not coming from somewhere up on the prototype chain) then object.hasOwnProperty is the way to go. All modern browsers support it. (It was missing in older versions of Safari - 2.0.1 and older - but those versions of the browser are rarely used any more.)

If what you're looking for is if an object has a property on it that is iterable (when you iterate over the properties of the object, it will appear) then doing: prop in object will give you your desired effect.

Since using hasOwnProperty is probably what you want, and considering that you may want a fallback method, I present to you the following solution:

```js
var obj = {
    a: undefined,
    b: null,
    c: false
};

// a, b, c all found
for ( var prop in obj ) {
    document.writeln( "Object1: " + prop );
}

function Class(){
    this.a = undefined;
    this.b = null;
    this.c = false;
}

Class.prototype = {
    a: undefined,
    b: true,
    c: true,
    d: true,
    e: true
};

var obj2 = new Class();

// a, b, c, d, e found
for ( var prop in obj2 ) {
    document.writeln( "Object2: " + prop );
}

function hasOwnProperty(obj, prop) {
    var proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) &&
        (!(prop in proto) || proto[prop] !== obj[prop]);
}

if ( Object.prototype.hasOwnProperty ) {
    var hasOwnProperty = function(obj, prop) {
        return obj.hasOwnProperty(prop);
    }
}

// a, b, c found in modern browsers
// b, c found in Safari 2.0.1 and older
for ( var prop in obj2 ) {
    if ( hasOwnProperty(obj2, prop) ) {
        document.writeln( "Object2 w/ hasOwn: " + prop );
    }
}
```

## Promise 封装wx.request

```js
// currying
// 传入函数作为变量在动态语言中非常常见 python
// 代理模式
const promisic = (fn) => {
  return function(params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success:(res) => {
          resolve(res)
        },
        fail:(error) => {
          reject(error);
        }
      })
      fn(args);
    })
  }
}

export {
  promisic
}
```