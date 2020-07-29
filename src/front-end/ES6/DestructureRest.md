# Destructure And Rest Operator

## Destructure

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


### Object

One potential gotcha you should be aware of is when you are using destructuring on an object to assign variables, but not to declare them (when there is no let, const, or var):

```js
{ blowUp } = { blowUp: 10 };
// Syntax error
```

This happens because the JavaScript grammar tells the engine to parse any statement starting with { as a block statement (for example, { console } is a valid block statement). The solution is to either wrap the whole expression in parentheses:

```js
({ safe } = {});
// No errors
```

## Rest Operator

Spread syntax (...) allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected. (展开语法(Spread syntax), 可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开；还可以在构造字面量对象时, 将对象表达式按key-value的方式展开。(译者注: 字面量一般指 [1, 2, 3] 或者 {name: "mdn"} 这种简洁的构造方式))