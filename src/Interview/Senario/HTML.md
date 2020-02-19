# Html

## What does href expression `<a href=“javascript:;”></a>` do? 
HTML 中属性 href='javascript' 含义

* `<a>` 标签的href属性用于指定超链接目标URL，href属性的值可以是任何有效文档的相对或绝对URL，包括片段标识符和js代码段.

* `javascript:` 是一个伪协议，其他的伪协议还有mail: tel: file: 等。
  - `javascript:`表示：触发`<a>`默认动作时，执行一段js代码。而`javascript:;`表示什么都不执行，这样点击`<a>`时就没有任何反应。
  ```html
  <a id='pswEdit' href='javascript:;'>修改密码</a>
  ```

  - `href='javascript:;'`去掉a标签的默认行为，跟`href="javascript:void(0)"`是一样的`（void)`是js的一个运算符，void(0)表示什么都不做的意思）。

  - 一般会给`<a>`绑定一个事件回调来执行业务，如：
  ```js
  document.getElementById('jsPswEdit').addEventListener('click', function(e) {
    e.preventDefault();
    // 当<a>触发click时，处理业务
  }, false);
  ```
* `javascript:`是一种嵌套js代码在网页中的方法，跟通过`<script></script>`标签嵌套js代码差不多
```html
<a href='javascript:alert(22);'>点我</a>
```
点击会执行`javascript:`后面的代码。不过不推荐这种写法，因为`<a>`标签href属性通常是保存超链接，用来控制页面转向。

### 扩展:
其他防止页面跳转的实现方式：

1. `<a href="#" >test</a>；`
点击链接，页面默认上滚到页的顶部， 但可以加上 onclick="return false"，防止上滚到页的顶部。

2. `<a href="####" >test</a>；`
使用2个到4个#，见的大多是"####"，也有使用"#all"等其他的。一个无意义的标签指定，不做任何处理。

### 目的:

An `<a>` element is invalid HTML unless it has either an href or name attribute.

If you want it to render correctly as a link (ie underlined, hand pointer, etc), then it will only do so if it has a href attribute.

**Code like this is therefore sometimes used as a way of making a link, but without having to provide an actual URL in the href attribute. The developer obviously wanted the link itself not to do anything, and this was the easiest way he knew.**

He probably has some javascript event code elsewhere which is triggered when the link is clicked, and that will be what he wants to actually happen, but he wants it to look like a normal `<a>` tag link.

Some developers use href='#' for the same purpose, but this causes the browser to jump to the top of the page, which may not be wanted. And he couldn't simply leave the href blank, because href='' is a link back to the current page (ie it causes a page refresh).

There are ways around these things. Using an empty bit of Javascript code in the href is one of them, and although it isn't the best solution, it does work.

:::tip
<a href="https://stackoverflow.com/questions/7755088/what-does-href-expression-a-href-javascript-a-do">more</a>
:::