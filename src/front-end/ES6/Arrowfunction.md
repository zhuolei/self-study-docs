# Arrow Function

## Returning Object Literals from Arrow Functions

Let's assume we want the square function to return the square of the given number as a property of an object literal. This is how we'd traditionally define the function:

```js
var square = function(n) {
  return {
    square: n * n
  };
};
```

If you were to rewrite this function expression as an arrow function, you might be tempted to simply translate it just like we did in the previous example, like this:

```js
let square = n => {
  square: n * n;
};
```

When you call `square`, though, you'll notice the function doesn't work as intended. No matter which input value you pass, you'll get `undefined` as a return value. Why is that?

The issue with the arrow function is that the parser doesn't interpret the two braces as an **object literal**, but as a **block statement**. Within that block statement, the parser sees a label called `square` which belongs to the expression statement `n * n`. Since there's no return statement at all, the returned value is always `undefined`.

To be precise, the body of the function consists of a block statement whose statement list contains a single statement, a labeled statement. Its body is an expression statement holding the binary expression. There's no return statement.

What you need to do is **force** the parser to treat the object literal as an expression so that it's not treated as a block statement. The trick is to **add parentheses** around the entire body:

```js
let square = n => ({ square: n * n });
```

::: tip
Learn more about this.resolve <a href="https://mariusschulz.com/blog/returning-object-literals-from-arrow-functions-in-javascript" target="_blank">here</a>.
:::