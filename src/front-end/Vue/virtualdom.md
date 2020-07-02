# Virtual Dom

- Virtual Dom decouples rendering logic from the actual Dom: makes it straightforward to reuse it in non-browser environments, e.g. rendering to a string (SSR), rendering to canvas/WebGL, or native mobile rendering.
 - In vue 2 custom render api is not officially documented, you need to go to source code. In vue 3, it is first class API
- Provides the ability to programmatically construct, inspect, clone derivative structures using the full power of JavaScript(usually used for ui-component lib)

## Render function

### In Vue 2
```js
render(h) {
  // return vnode, takes argument types, {data, event, attrs} children nodes
  return h('div', {
    attrs: {
      id: 'foo'
    },
    on: {
      click: this.onClick
    }
  }, 'hello')
}
```

### In Vue 3
- Flat props structure
- Globally imported 'h' helper

```js
import { h } from 'vue';
render () {
  return h('div', {
    id: 'foo',
    onClick: this.onClick,
  }, 'hello')
}

```

```js
import { h } from 'vue';

// <div id="hello"><span>world</span></div>
const App = {
  render() {
    return h('div', {
      id: 'hello'
    }, [ h('span', 'world')])
  }
}

// v-if
const App = {
  render() {
    return this.ok 
    ? h('div', { id: 'hello' }, [ h('span', 'world') ])
    : this.otherCondition // v-else
      ? h('p', 'other branch')
      : h('span')
  }
}

// v-for 
const App = {
  render() {
    return this.list.map(item => {
      return h('div', {key: item.id}, item.text)
    })
  }
}

// slot
const App = {
  render() {
    const slot = this.$slots.default 
      ? this.$slots.default();
      : []

    return h('div', slot)
  }
}
```