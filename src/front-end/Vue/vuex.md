# Vuex

## Core Concepts

### Modules

#### 模块动态注册

在 store 创建之后，你可以使用 `store.registerModule` 方法注册模块：
```js
import Vuex from 'vuex'

const store = new Vuex.Store({ /* 选项 */ })

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```