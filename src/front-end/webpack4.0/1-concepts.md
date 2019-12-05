# Concepts
## Entry

An entry point indicates which module webpack should use to begin building out its internal dependency graph. webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).

By default its value is `./src/index.js`, but you can specify a different (or multiple entry points) by setting an entry property in the webpack configuration. For example:

`webpack.config.js`
```js
module.exports = {
  entry: './src/index.js'
  // entry: {
  //  main: ''./src/index.js' 
  // }
}
```

## Output

The output property tells webpack where to emit the bundles it creates and how to name these files. It defaults to `./dist/main.js` for the main output file and to the `./dist` folder for any other generated file.

You can configure this part of the process by specifying an output field in your configuration:

`webpack.config.js`
```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), 
    // __dirname means the location of webpack.config.js
    // path.resolve will generate a new absolute path
    filename: 'bundle.js'
  }
};
```
::: tip
Learn more about path.resolve <a href="https://blog.csdn.net/kikyou_csdn/article/details/83150538" target="_blank">here</a> or <a href="https://stackoverflow.com/questions/35048686/difference-between-path-resolve-and-path-join-invocation/45542259" target="_blank">here</a>.
:::
if you want to use a different config file name, you can use `npx webpack --config webpack.js` in command line or add `webpack --config webpack.js` in package.json scripts property

if `mode: 'production'`, the bundle.js file will be minified, you can pass it as a CLI argument `webpack --mode=development`

::: tip
Learn more about mode <a href="https://webpack.js.org/configuration/mode/" target="_blank">here</a>.
:::

## Loaders

### What is loader
Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.

At a high level, **loaders** have two properties in your webpack configuration:

- The `test` property identifies which file or files should be transformed.
- The `use` property indicates which loader should be used to do the transforming.

`webpack.config.js`
```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), 
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
      // for file { test: /\.jpg$/, use: { loader: 'file-loader' } }
    ]
  }
};
```
<p style="background-color:#ffffcc; padding-left: 4px">if you want to bundle vue file, you can write like this <strong>{ test: /\.vue$/, use: 'vue-loader' }</strong></p>

`index.js`

```js
import avatar from './avatar.jpg';

var img = new Image();
img.src = avatar;
var root = document.getElementById('root');
root.append(img)
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src='./bundle.js'></script>
</body>
</html>
```
::: tip
Keep in mind that when using regex to match files, you may not quote it. i.e `/\.txt$/` is not the same as `'/\.txt$/'` or `"/\.txt$/"`. The former instructs webpack to match any file that ends with .txt and the latter instructs webpack to match a single file with an absolute path '.txt'; this is likely not your intention.
:::

