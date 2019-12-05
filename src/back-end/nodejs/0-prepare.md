# Introduction
## Install
Use nvm to manage multiple nodejs versions

`macos`
```js
brew install nvm
```

::: tip
How to install homebrew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
:::

`win10`
search nvm-windows in github

Then run `npm init -y` in terminal to get node environment in current folder
### nvm command
- nvm list  //check all node versions
- nvm install 10.13.0   // install specific version
- nvm use 10.13.0 // use node

## NodeJS vs JS
- ECMAScript is grammar rule
- nodejs = ECMAScript + nodejs API, nodejs can hanlde http request and file system
- js = ECMAScript + WEB API, js can handle DOM/BOM manipulation, event, Ajax

## Backend development vs FrontEnd development
- server stability
- optimize memory and CPU
- log record
- security
- cluster & service split
## CommonJS
The CommonJS module specification is the standard used in `Node.js` for working with modules.

First install lodash `npm i lodash -save`
`a.js`
```js
function add(a, b) {
  return a + b;
}

function mul(a, b) {
  return a * b;
}

// if only one function, module.exports = add;
module.exports = {
  add,
  mul
}
```
`b.js`
```js
const {add, mul} = require('./a'); // one function will be const add = require('./a')
const _ = require('lodash'); // use _ to represent lodash

const sum = add(10, 20);
console.log(sum)

const arr = _.concat([1, 2], 3)
console.log('arr...', arr)
```
Then run `node` `b.js` in terminal


## Debugger
use vscode


