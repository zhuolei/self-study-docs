# Devtool 
This option controls if and how source maps are generated.

Use the `SourceMapDevToolPlugin` for a more fine grained configuration. See the `source-map-loader` to deal with existing source maps.
## Usage

`webpack.config.js`
```js
module.exports = {
  mode: 'development',
  devtool: 'source-map'
}
```