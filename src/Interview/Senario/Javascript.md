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

```js
// for of
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

// reduce

function flatten(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
```

:::tip
<a href="https://www.jianshu.com/p/b1fb3434e1f5">More</a>
:::