# Javascript

## Javascript principles

- Goes through the code line-by-line and runs/ ’executes’ each line - known as the **thread of execution**
- Saves ‘data’ like strings and arrays so we can use that data later - in its memory. (We can even save code
(‘functions’))
- Code we save (‘define’) functions & can use (call/invoke/execute/run) later with the function’s name & ( )

### Execution context

Created to run the code of a function - has 2 parts

- Thread of execution
- Memory

As soon as we run our file of code, we create a global execution context for running the overall file of code, that's main program
when we run `const output = multiplyBy2(num);` function, we created a mini execuation context

```js
const num = 3;
function multiplyBy2 (inputNumber){
  const result = inputNumber*2;
  return result;
}
const output = multiplyBy2(num);
const newOutput = multiplyBy2(10);
```