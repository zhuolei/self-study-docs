# flexbox

<a href="https://codepen.io/leo2018/pen/jOPgyQr">Codepen</a>

## Basic

flex容器将消除item的块状特性

```html
<div class="container">
  <div class="box one"></div>
  <div class="box two"></div>
  <div class="box three"></div>
</div>
```

```css
.container {
  display: flex;
}

.box {
  width: 100px;
  height: 100px;
}

.one {
  background-color: yellow;
}

.two {
  background-color: red;
}

.three {
  background-color: blue;
}
```
![img](~@pic/img/flex-1.png)

## flex-direction

- row (default): left to right in ltr; right to left in rtl
- row-reverse: right to left in ltr; left to right in rtl
- column: same as row but top to bottom
- column-reverse: same as row-reverse but bottom to top

```css
.container {
  display: flex;
  flex-direction: row-reverse; // row | row-reverse | column | column-reverse;
}
```
![img](~@pic/img/flex-3.png)

:::tip
当没有在container设置宽高时，width是100%，高度是自适应，所以reverse的时候row会出现上面这种情况，而column就不会，如果给height一个值，`column-reverse`也会出现这种情况
:::

## justify-content
This defines the alignment along the main axis（主轴）. 

:::tip
要注意的是当`flex-direction`有reverse的时候，start和end的位置也会颠倒
:::

```css
.container {
  display: flex;
  flex-direction: row-reverse; // row | row-reverse | column | column-reverse
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
}
```

- flex-start (default): items are packed toward the start of the flex-direction.
- flex-end: items are packed toward the end of the flex-direction.
- center: items are centered along the line 居中
- space-between: items are evenly distributed in the line; first item is on the start line, last item on the end line 平均分布
- space-around: items are evenly distributed in the line with equal space around them. Note that visually the spaces aren’t equal, since all the items have equal space on both sides. The first item will have one unit of space against the container edge, but two units of space between the next item because that next item has its own spacing that applies.等距分布，item两侧的距离均相等所以会导致中间看起来宽一点
- start: items are packed toward the start of the writing-mode direction. 
- end: items are packed toward the end of the writing-mode direction.
- left: items are packed toward left edge of the container, unless that doesn’t make sense with the flex-direction, then it behaves like start.
- right: items are packed toward right edge of the container, unless that doesn’t make sense with the flex-direction, then it behaves like start.
- space-evenly: items are distributed so that the spacing between any two items (and the space to the edges) is equal.

:::warning
`space-between` never got support from some versions of Edge, and start/end/left/right aren’t in Chrome yet. MDN has detailed charts. The safest values are `flex-start`, `flex-end`, and `center`.
:::

## align-items

这里涉及到一个概念主轴和交叉轴，当`flex-direction: column`时主轴是列，交叉轴为行

```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: grey;
  height: 200px;
}
```
`justify-content`控制的是主轴上的对齐

![img](~@pic/img/flex-4.png)

如果我们加了`align-items: center;`会变成这样

![img](~@pic/img/flex-5.png)