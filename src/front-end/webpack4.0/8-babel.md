# Babel

## Install
```js
npm install --save-dev babel-loader @babel/core
```

Babel-loader is just connection between babel and webpack, if we want to transform ES6 to ES5 you need babel-preset-env

```js
npm install @babel/preset-env --save-dev
```

Babel includes a polyfill that includes a custom regenerator runtime and core-js.

This will emulate a full ES2015+ environment (no < Stage 4 proposals) and is intended to be used in an application rather than a library/tool. (this polyfill is automatically loaded when using babel-node).

This means you can use new built-ins like `Promise` or `WeakMap`, static methods like `Array.from` or `Object.assign`, instance methods like `Array.prototype.includes`, and generator functions (provided you use the regenerator plugin). The polyfill adds to the global scope as well as native prototypes like String in order to do this.
```js
npm install --save @babel/polyfill
```

::: tip
Because this is a polyfill (which will run before your source code), we need it to be a `dependency`, not a `devDependency`
:::

## Usage

`index.js`
```js
import "@babel/polyfill"

const arr = [
  new Promise(() => {}),
  new Promise(() => {})
];

arr.map(item => {
  console.log(item);
})
```

`webpack.config.js`
```js
module.exports = {
  //entry: './src/index.js'
  entry: {
   main: './src/index.js',
  },
  module: {
    rules: [{ 
      test: /\.js$/, // if a file is js file, use babel-loader to do syntax analyze
      exclude: /node_modules/, // exclude js file in node_modules folder
      loader: "babel-loader",
      options: {
        presets: [['@babel/preset-env', {
          targets: {
            edge: "17",
            firefox: "60",
            chrome: "67",
            safari: "11.1",
          },
          // because chrome already support es6 so, babel will do nothing for the target list browsers
          useBuiltIns: 'usage', // partially bundle need ES6 feature in main.js, minimize main.js file size
        }]]
      }
    }]
  },
  output: {
    publicPath: 'http://cdn.com.cn',
    // name is placeholder, so it will output two file one is main.js another is sub.js
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}

```
Instead of add options property in rules you can create `.babelrc` or `babel.config.js` config in your project root and enable some plugins.

- You want to programmatically create the configuration?
- You want to compile node_modules?

`babel.config.js` in babel 7 is for you!

Create a file called `babel.config.js` with the following content at the root of your project (where the `package.json` is).
```js
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
];

if (process.env.COMPILE_ENV === 'CLIENT') {
  presets.push(['@vue/app', { useBuiltIns: 'entry' }]);
}
module.exports = { presets };
```
- You have a static configuration that only applies to your simple single package?

`.babelrc` is for you
```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "edge": "17",
        "firefox": "60",
        "chrome": "67",
        "safari": "11.1",
      },
      "useBuiltIns": "usage"
    }]
  ],
  "plugins" : [[]]
}
```
::: warning
if you are building lib, you need use @babel/plugin-transform-runtime
:::
## @babel/plugin-transform-runtime

A plugin that enables the re-use of Babel's injected helper code to save on codesize.

### Install
```js
npm install --save-dev @babel/plugin-transform-runtime
```

### Usage
**Via .babelrc (Recommended)**
Add the following line to your .babelrc file:
Without options:

```json
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

With options (and their defaults):

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false, // corejs normal be 2
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```
### Options
**`corejs`**
| `corejs` option | Install command |
| ----------- | ----------- |
| false | `npm install --save @babel/runtime` |
| 2 | `npm install --save @babel/runtime-corejs2` |
| 3 | `npm install --save @babel/runtime-corejs3` |

::: tip
<a href="https://segmentfault.com/q/1010000012041869/a-1020000012044930" target="_blank">babel-plugin-transform-runtime vs babel-runtime</a>
<a href="https://cloud.tencent.com/developer/section/1489431" target="_blank">why we need transform-time</a>
:::