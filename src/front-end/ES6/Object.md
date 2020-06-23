# Object

## Deep clone && Sallow copy

### Object.assign

```js
const target = {
  a: 5
};
const source = {
  a: 1,
  b: 2,
}
Object.assign(target, source); // {a: 1, b:2}

```