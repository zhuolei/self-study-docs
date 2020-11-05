(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{435:function(t,s,e){"use strict";e.r(s);var a=e(42),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"arrow-function"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#arrow-function"}},[t._v("#")]),t._v(" Arrow Function")]),t._v(" "),e("h2",{attrs:{id:"returning-object-literals-from-arrow-functions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#returning-object-literals-from-arrow-functions"}},[t._v("#")]),t._v(" Returning Object Literals from Arrow Functions")]),t._v(" "),e("p",[t._v("Let's assume we want the square function to return the square of the given number as a property of an object literal. This is how we'd traditionally define the function:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("square")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    square"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" n "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" n\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("If you were to rewrite this function expression as an arrow function, you might be tempted to simply translate it just like we did in the previous example, like this:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("square")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  square"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" n "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("When you call "),e("code",[t._v("square")]),t._v(", though, you'll notice the function doesn't work as intended. No matter which input value you pass, you'll get "),e("code",[t._v("undefined")]),t._v(" as a return value. Why is that?")]),t._v(" "),e("p",[t._v("The issue with the arrow function is that the parser doesn't interpret the two braces as an "),e("strong",[t._v("object literal")]),t._v(", but as a "),e("strong",[t._v("block statement")]),t._v(". Within that block statement, the parser sees a label called "),e("code",[t._v("square")]),t._v(" which belongs to the expression statement "),e("code",[t._v("n * n")]),t._v(". Since there's no return statement at all, the returned value is always "),e("code",[t._v("undefined")]),t._v(".")]),t._v(" "),e("p",[t._v("To be precise, the body of the function consists of a block statement whose statement list contains a single statement, a labeled statement. Its body is an expression statement holding the binary expression. There's no return statement.")]),t._v(" "),e("p",[t._v("What you need to do is "),e("strong",[t._v("force")]),t._v(" the parser to treat the object literal as an expression so that it's not treated as a block statement. The trick is to "),e("strong",[t._v("add parentheses")]),t._v(" around the entire body:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("square")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" square"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" n "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" n "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("Learn more about this.resolve "),e("a",{attrs:{href:"https://mariusschulz.com/blog/returning-object-literals-from-arrow-functions-in-javascript",target:"_blank"}},[t._v("here")]),t._v(".")])])])}),[],!1,null,null,null);s.default=n.exports}}]);