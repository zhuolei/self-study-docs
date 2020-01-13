# Javascript core concepts
## This, new, bind, call, apply

### 1. This 指向的类型

刚开始学习 JavaScript 的时候，this 总是最能让人迷惑，下面我们一起看一下在 JavaScript 中应该如何确定 this 的指向。

`this` 是在函数被调用时确定的，它的指向完全取决于函数调用的地方，而不是它被声明的地方（除箭头函数外）。当一个函数被调用时，会创建一个执行上下文，它包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息，`this` 就是这个记录的一个属性，它会在函数执行的过程中被用到。

`this` 在函数的指向有以下几种场景：

- 作为构造函数被 new 调用；
- 作为对象的方法使用；
- 作为函数直接调用；
- 被 call、apply、bind 调用；
- 箭头函数中的 this；

#### 1.1 new 绑定

函数如果作为构造函数使用 new 调用时， this 绑定的是新创建的构造函数的实例。

```js
function Foo() {
    console.log(this)
}

var bar = new Foo()       // 输出: Foo 实例，this 就是 bar
```


实际上使用 `new` 调用构造函数时，会依次执行下面的操作：

创建一个新对象；
构造函数的 `prototype` 被赋值给这个新对象的 `__proto__`；
将新对象赋给当前的 `this`；
执行构造函数；
如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象，如果返回的不是对象将被忽略；

#### 1.2 显式绑定

通过 call、apply、bind 我们可以修改函数绑定的 this，使其成为我们指定的对象。通过这些方法的第一个参数我们可以显式地绑定 this。

```js
function foo(name, price) {
    this.name = name
    this.price = price
}

function Food(category, name, price) {
    foo.call(this, name, price)       // call 方式调用
    // foo.apply(this, [name, price])    // apply 方式调用
    this.category = category
}

new Food('食品', '汉堡', '5块钱')

// 浏览器中输出: {name: "汉堡", price: "5块钱", category: "食品"}
```

call 和 apply 的区别是 call 方法接受的是参数列表，而 apply 方法接受的是一个参数数组。

```js
func.call(thisArg, arg1, arg2, ...)        // call 用法
func.apply(thisArg, [arg1, arg2, ...])     // apply 用法
```

而 bind 方法是设置 this 为给定的值，并返回一个新的函数，且在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。

```js
func.bind(thisArg[, arg1[, arg2[, ...]]])    // bind 用法
```

:::tip
在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或 global）对象。当类的方法中需要 this 指向类的实例时，你可能需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。
```js
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用 'declare' 方法
```

:::


举个例子：

```js
var food = {
    name: '汉堡',
    price: '5块钱',
    getPrice: function(place) {
        console.log(place + this.price)
    }
}

food.getPrice('KFC ')   // 浏览器中输出: "KFC 5块钱"

// 当第一个参数是对象的时候，改变this的指向指向对象
var getPrice1 = food.getPrice.bind({ name: '鸡腿', price: '7块钱' }, '肯打鸡 ')
getPrice1()       // 浏览器中输出: "肯打鸡 7块钱"
```

关于 bind 的原理，我们可以使用 apply 方法自己实现一个 bind 看一下：

```js
// ES5 方式
Function.prototype.bind = Function.prototype.bind || function() {
    var self = this
    // rest1 and rest2 are different
    var rest1 = Array.prototype.slice.call(arguments)
    var context = rest1.shift()
    return function() {
        var rest2 = Array.prototype.slice.call(arguments)    
        return self.apply(context, rest1.concat(rest2))
    }
}

// ES6 方式
Function.prototype.bind = Function.prototype.bind || function(...rest1) {
    const self = this
    const context = rest1.shift()
    return function(...rest2) {
        return self.apply(context, [...rest1, ...rest2])
    }
}
```

:::tip
`Array.prototype.slice.call(arguments)` 本质就是arguments这个对象使用了数组的slice这个方法，得到了参数构成的数组（也可以用apply）
key points
- Array是构造函数
- arguments是类数组对象(缺少很多数组的方法)
- call让一个对象调用另一个对象的方法。你可以使用call()来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）
- slice从一个数组中切割，返回新的数组，不修改切割的数组

**注意：** 如果你把 null 或 undefined 作为 this 的绑定对象传入 call、apply、bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。

```js
var a = 'hello'

function foo() {
    console.log(this.a)
}

foo.call(null)         // 浏览器中输出: "hello"
```
:::

#### 1.3 隐式绑定

函数是否在某个上下文对象中调用，如果是的话 `this` 绑定的是那个上下文对象。

```js
var a = 'hello'

var obj = {
    a: 'world',
    foo: function() {
        console.log(this.a)
    }
}

obj.foo()       // 浏览器中输出: "world"
```

上面代码中，foo 方法是作为对象的属性调用的，那么此时 foo 方法执行时，this 指向 obj 对象。也就是说，此时 this 指向调用这个方法的对象，如果嵌套了多个对象，那么指向最后一个调用这个方法的对象：

```js
var a = 'hello'

var obj = {
    a: 'world',
    b:{
        a:'China',
        foo: function() {
            console.log(this.a)
        }
    }
}

obj.b.foo()      // 浏览器中输出: "China"
```

最后一个对象是 obj 上的 b，那么此时 foo 方法执行时，其中的 this 指向的就是 b 对象。

#### 1.4 默认绑定

函数独立调用，直接使用不带任何修饰的函数引用进行调用，也是上面几种绑定途径之外的方式。非严格模式下 this 绑定到全局对象（浏览器下是 winodw，node 环境是 global），严格模式下 this 绑定到 undefined （因为严格模式不允许 this 指向全局对象）。