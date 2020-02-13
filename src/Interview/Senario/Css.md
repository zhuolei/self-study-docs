# CSS

## Adjust image size according to parent div

```html
<div class="parent">
  <img src="/folder/">
</div>
```
```css
.parent {
  width: 200px;
  height: 200px;
}

.parent img {
  width: 100%;
}
```