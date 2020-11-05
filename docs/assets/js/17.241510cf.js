(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{354:function(t,s,a){t.exports=a.p+"assets/img/leetcode_201.3a77e9a6.png"},449:function(t,s,a){"use strict";a.r(s);var n=a(42),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"bitwise"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#bitwise"}},[t._v("#")]),t._v(" Bitwise")]),t._v(" "),n("h2",{attrs:{id:"basic"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#basic"}},[t._v("#")]),t._v(" Basic")]),t._v(" "),n("h3",{attrs:{id:"_201-bitwise-and-of-numbers-range"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_201-bitwise-and-of-numbers-range"}},[t._v("#")]),t._v(" 201. Bitwise AND of Numbers Range")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://leetcode.com/problems/bitwise-and-of-numbers-range/",target:"_blank"}},[t._v("Link")])]),t._v(" "),n("p",[t._v("Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this range, inclusive.")]),t._v(" "),n("p",[n("strong",[t._v("Example 1:")])]),t._v(" "),n("Codeblock",[n("p",[t._v("\nInput: [5,7]"),n("br"),t._v("\nOutput: 4"),n("br")])]),t._v(" "),n("p",[n("strong",[t._v("Example 2:")])]),t._v(" "),n("Codeblock",[n("p",[t._v("\nInput: [0,1]"),n("br"),t._v("\nOutput: 0"),n("br")])]),t._v(" "),n("p",[t._v("笔记：当一个数+1时，总会有这么一个规律“某一位后的数字，全部被置为相反数”。举个例子：")]),t._v(" "),n("ul",[n("li",[t._v("010111 + 1 = 011000，则010111 & 011000 = 010000。那么，x & (x+1) 后几位相反数的“与操作”，结果总为0。")])]),t._v(" "),n("p",[t._v("所以，当(m,m+1,...n-1,n)进行连续“与操作”时，会按照上述规律被抵消很大一部分，而只剩下n的前缀部分，最后只需将n归位。举个例子：")]),t._v(" "),n("ul",[n("li",[t._v("m = 5(0101), n = 7 (0111)。不停右移，得到n前缀部分为01，最后归位前缀得res=0100=4")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("rangeBitwiseAnd")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("m"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" n")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" offset "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("m "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" offset"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    m "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    n "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" n "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" offset"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),n("p",[t._v("按位操作符（Bitwise operators） 将其操作数（operands）当作32位的比特序列（由0和1组成），而不是十进制、十六进制或八进制数值。例如，十进制数9，用二进制表示则为1001。按位操作符操作数字的二进制形式，但是返回值依然是标准的JavaScript数值。\n"),n("img",{attrs:{src:a(354),alt:"img"}})])])],1)}),[],!1,null,null,null);s.default=e.exports}}]);