# Plugins

Plugins like life cycle hook
## html-webpack-plugin && clean-webpack-plugin
The `HtmlWebpackPlugin` simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using `lodash templates`, or use your own loader.

### Install
```js
npm install --save-dev html-webpack-plugin clean-webpack-plugin
```

### Usage
The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using `script` tags. Just add the plugin to your webpack config as follows:

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>template</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

`webpack.config.js`

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), 
  },
  module: {
    rules: [{
      test: /\.(jpg | png | gif))$/, 
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/'
        }
      }
    }]
  },
  plugins: [new HtmlWebpackPlugin({
      template: 'src/index.html'
  }), new CleanWebpackPlugin(['dist'])]// remove dist folder for each bundle
};
```

## Tapable Plugin System

## Create a Plugin 

MyFirstWebpackPlugin.js

```js
class MyFirstWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tapAsync("MyFirstWebpackPlugin", (stats, cb) => {
      console.log(stats);
      debugger
    })
  }
}

module.exports = MyFirstWebpackPlugin;
```

And apply plugin in webpack.config.js