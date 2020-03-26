# Natours Project

## Building the header

First we need `index.html` 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet">

    <link rel="stylesheet" href="css/icon-font.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="shortcut icon" type="image/png" href="img/favicon.png">
    
    <title>Natours | Exciting tours for adventurous people</title>
  </head>
  <body>
    <header class="header">

    </header>
  </body>
</html>
```

Then we need `style.css`

```CSS
* {
  margin: 0;
  padding: 0;
  /*告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding */
  box-sizing: border-box;
}

body {
  /* everything related to font, we put in the body selector */
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.7;
  color: #777;
}

.height {
  /* means 95% of view port height */
  height: 95vh; 
  background-image: url(../img/hero.jpg);
  background-size: cover;
}
```

:::tip 
more about <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing">box sizing</a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size">background</a>
:::
`margin: 0; padding: 0;` inside universal selector is a basic reset to make sure our website look same in every browser