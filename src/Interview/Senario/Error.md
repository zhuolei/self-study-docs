# Handle Error
## JS

```js
const buildError = obj => !obj ? {} : ({
  ...obj.error && { error: obj.error },
  ...obj.
})
```