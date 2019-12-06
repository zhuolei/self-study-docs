# Class
## Define a class

`es5`
```js
let Animal = function () {
  this.type = type
}

// if you put function eat in prototype, then eat function will not be put in the dog instance
// which reduce the size of the dog instance
Animal.prototype.eat = function() {
  console.log('eat')
}

let dog = new Animal('dog')
let monkey = new Animal('monkey')
monkey.constructor.prototype.eat = function () {
  console.log('error')
}
dog.eat() // error
monkey.eat() // error
```

`es6`
```js
class Animal {
  constructor(type) {
    this.type = type
  }
  eat () {
    console.log('I am eat food')
  }
}
let dog = new Animal('dog')
let monkey = new Animal('monkey')

dog.eat() // I am eat food
monkey.eat() // I am eat food

console.log(typeof Animal) // function
```
::: tip
type of class is function, class is syntax sugar(syntax not same, but achievement is same)
:::

::: warning
An important difference between **function declarations** and **class declarations** is that function declarations are hoisted and class declarations are not. You first need to declare your class and then access it, otherwise code like the following will throw a `ReferenceError`:
:::

```js
const a = new Animal(); // ReferenceError

class Animal {}
```

## Setter && Getter
```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```
`class`
```js

```