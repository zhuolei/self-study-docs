# Vue 3

Vue 3 Cheat Sheet

<iframe src="https://www.vuemastery.com/pdf/Vue-3-Cheat-Sheet.pdf" width="100%" height="600"></iframe>

## Limitation of Vue 2

- Readability as components grow

- Code reuse patterns have drawbacks

- Limited TypeScript Support

### Large components can become hard to read & maintain

Image we want to write a search component

![img](~@pic/img/vue3-1.png)

if we move all logic in one place it will be more readable

![img](~@pic/img/vue3-2.png)

Then we can put function in another place

![img](~@pic/img/vue3-3.png)

In this case, Code can now be organized by logical concerns

### No perfect way to reuse logic between components

Three ways in vue2

![img](~@pic/img/vue3-4.png)

![img](~@pic/img/vue3-5.png)

![img](~@pic/img/vue3-6.png)

Composition Functions in vue3

![img](~@pic/img/vue3-7.png)

## Composition API 

Note: This Composition API Syntax is Additive. All previous Component syntax valid

When to use it?

- TypeScript support
- Component is too large and needs to be organized by feature
- Need to reuse code across other components

### Setup & Reactive References

Setup method Excutes before:

- Components
- Props
- Data
- Methods
- Computed Properties
- Lifecycle methods

:::warning
Doesn't have access to "this"
:::

Optional first argument is props. It is reactive and can be watched

```js
import { watch } from "vue";
export default {
  props: {
    name: String
  },
  setup(props) {
    watch(() => {
      console.log(props.name);
    })
  }
}
```

Optional second argument is context. Context can be use to access **Properties** previously accessed by this.

```js
setup(props, context) {
  context.attrs;
  context.slots;
  context.parent;
  context.root;
  context.emit;
}
```

Ref function creates a reactive reference. This wraps our primitive in an object, allowing us to track changes. previously `data()` was wrapping our primitives in an object.

```js
<template>
  <div>Capacity: {{capacity}}</div>
</template>
import { ref } from "vue";
// import { ref } from "@vue/composition-api"; in vue 2
export default {
  props: {
    name: String
  },
  setup() {
    const capacity = ref(3);
    // Returns the variables and functions that our template will need.
    return { capacity };
  }
}
```

This is more verbose, but it also make our component more maintainable. Because:

- We can control what gets exposed
- We can trace where a property is defined

:::tip
With the composition API we can declare reactive objects that aren't associated with a component
:::

### Method



