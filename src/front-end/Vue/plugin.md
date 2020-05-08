# Plugin

## Simple Plugin

### Goal

Create a plugin that teaches Vue components to handle a custom "rules"
option. The "rules" option expects an object that specifies validation rules
for data in the component.

### Hints

1. The plugin should install a global mixin
2. The global mixin contains a "created" hook
3. In the hook, check for `this.$options.rules`

Expected usage:

``` js
const myPlugin = Vue => {
  Vue.mixin({
    created() {
      if (this.$options.rules) {
        // do something
      }
    }
  })
}
// or 
const myPlugin = {
  install (Vue) {
    Vue.mixin({
      created () {
        if (this.$options.rules) {
          // do something
          Object.keys(this.$options.rules).forEach(key => {
            const rule = this.$options.rules[key];
            this.$watch(key, newValue => {
              const result = rule.validate(newValue);
              if (!result) {
                console.log(rule.message)
              }
            })
          })
        }
      }
    })
  }
}
const vm = new Vue({
  data: { foo: 10 },
  rules: {
    foo: {
      validate: value => value > 1,
      message: 'foo must be greater than one'
    }
  }
})

vm.foo = 0 // should log: "foo must be greater than one"
```

## Example for store plugin

```js
const modulePath = 'localization';
const uiStore = locale => ({
  namespaced: true,
  state() {
    return {
      locale,
    }
  },
  getters: {
    config: state => state.config || {},
    //通过让 getter 返回一个函数，来实现给 getter 传参
    i18n(state) {
      return (key, ...subs) => {
        if (key === 'all') return state.localel;
        if (!state.locale || !state.locale[key]) return key;
        if (state.locale[key] && !subs.length) return state.locale[key];
        return subs.reduce((acc, str, index) => acc.replace(`{${index}}`, str), state.locale[key]);
      };
    },
  },
})

const install = (Vue, { store, locale = {} }) => {

  if (!store) {
    throw new Error('Please provide vuex store');
  }
  store.registerModule(modulePath, uiStore(locale))

  Vue.prototype.locale = store.getters[`${modulePath}/locale`];
}

const plugin = {
  install,
  version
}

export default plugin;

// plugin automatic Installation
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
```

:::tip 
more about <a href="https://www.digitalocean.com/community/tutorials/vuejs-creating-custom-plugins">Custom Plugin</a>
:::