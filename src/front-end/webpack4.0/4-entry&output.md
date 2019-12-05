# Entry && Output
## Usage

Entry can be object or string
`webpack.config.js`
```js
module.exports = {
  //entry: './src/index.js'
  entry: {
   main: './src/index.js',
   sub: './src/index.js'
  },
  output: {
    publicPath: 'http://cdn.com.cn',
    // name is placeholder, so it will output two file one is main.js another is sub.js
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
Output Html

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src="main.js"></script>
  <script src="sub.js"></script>
</body>
</html>
```

