# Loaders
## Bundle static files (file-loader)

First install file loader
```js
npm i file-loader -D // -D == --save-dev
```

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
    rules: [{
      test: /\.(jpg | png | gif))$/, 
      use: {
        loader: 'file-loader',
        options: {
          // ext is placeholder for extension
          // this means keep same file name after bundled
          name: '[name].[ext]',
          // outputPath means image file will be bundled into ./dist/images/ folder
          outputPath: 'images/'
        }
      }
    }, {
      test: /\.(eot | ttf | svg))$/, // use file loader to bundle font file
      use: {
        loader: 'file-loader'
      }
    }]
  }
};
```

::: tip
Learn more about loader <a href="https://webpack.js.org/loaders/" target="_blank">here</a>.
How to bundle font file, you can check mukewang webpack course 3-4 or <a href="https://webpack.js.org/guides/asset-management/" target="_blank">here</a>.
:::

## Bundle static files (url-loader)

url-loader will use base64 convert picture and put it directly in bundle.js, url-loader is more likely used when the size of jpg file is really small and it will reduce number of http request, otherwise it will more time to load bundle.js file

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
    rules: [{
      test: /\.(jpg | png | gif))$/, 
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 2048
        }
      }
    }]
  }
};
```
<p style="background-color:#ffffcc; padding-left: 10px">when picture file bigger than 2kb, <i>url-loader</i> will behave like <i>file-loader</i></p>

## Bundle static files (style-loader && css-loader)

The `css-loader` interprets @import and url() like import/require() and will resolve them, it will analyze the relationship between all css files

First install these two loaders
```js
npm install style-loader css-loader -D
```

`index.css`
```css
.avatar {
  width: 150px;
  height: 150px;
}
```

`index.js`
```js
import avatar from './avatar.jpg';
import './index.css';

var img = new Image();
img.src = avatar;
img.classList.add('avatar');

var root = document.getElementById('root');
root.append(img)
```

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
    rules: [{
      test: /\.(jpg | png | gif))$/, 
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          limit: 1024
        }
      }
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
};
```

## Bundle static files (sass-loader && postcss-loader)

### Install
```js
npm install sass-loader node-sass postcss-loader autoprefixer -D
```
::: tip
Inorder to use sass-loader, you need to install sass-loader node-sass both
:::

### Usage
`index.scss`
```css
body {
  .avatar {
    width: 150px;
    height: 150px;
    transform: translate(100px, 100px);
  }
}
```
`postcss.config.js`
```js
module.exports = {
  plugins: [
    require('autoprefixer') // autoprefixer plugin: add prefix -webkit- to css
  ]
}
```

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
    rules: [{
      test: /\.(jpg | png | gif))$/, 
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          limit: 1024
        }
      }
    },{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'] // execute order from right to left
    }]
  }
};
```
::: tip
Remeber, loader execution order is from right to left, so sass-loader go first, css-loader will be second, the last one is style-loader
:::

When `index.scss` `@import` a `avatar.scss` file, you need to add option property to css-loader
```js
{
  test: /\.scss$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        // other imported scss file in index.scss will still go through sass-loader/postcss-loader
        importLoaders: 2, 
        // css independently applied in different module, avoid global css
        modules: true
      }
    },
    'sass-loader',
    'postcss-loader'
  ]
}
```

`index.scss`
```css
@import './avatar.scss';
body {
  .avatar {
    width: 150px;
    height: 150px;
    transform: translate(100px, 100px);
  }
}
```

`createAvatar.js`
```js
import avatar from './avatar.jpg';
function createAvatar() {
  var img = new Image();
  img.src = avatar;
  img.classList.add('avatar');

  var root = document.getElementById('root');
  root.append(img)
}
export default createAvatar;
```

`index.js`
```js
import avatar from './avatar.jpg';
// if module = true, need to change import code style
import style from './index.css';
import createAvatar from './createAvatar';

createAvatar();

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);

var root = document.getElementById('root');
root.append(img)
```