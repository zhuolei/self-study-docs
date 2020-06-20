# Destructure

Destructuring assignment is a special syntax that allows us to “unpack” arrays or objects into a bunch of variables, as sometimes that’s more convenient. Destructuring also works great with complex functions that have a lot of parameters, default values, and so on.

:::tip
解构赋值相当于模式匹配，只要等号右边和左边结构相同，左边的变量就能被赋值
:::
```js
let [a, b, [c, d]] = [1, 2, [3, 4]];
console.log(a, b, c, d) // 1, 2, 3, 4

let [a, b, c] = [1, 2, [3, 4]];
console.log(a, b, c) // 1, 2, [3,4]

let [a, b, [c]] = [1, 2, [3, 4]];
console.log(a, b, c) // 1, 2, 3

let [a, b, c, d] = [1, 2, [3, 4]];
console.log(a, b, c, d) // 1, 2, [3,4], undefined

// 给d一个默认值
let [a, b, c, d = 5] = [1, 2, [3, 4]];
console.log(a, b, c, d) // 1, 2, [3,4], 5
```