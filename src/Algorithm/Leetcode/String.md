# String

## 387. First Unique Character in a String

Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

**Example:**

<Codeblock>
<p>
s = "leetcode"<br>
return 0.<br><br>
s = "loveleetcode",<br>
return 2.<br>
</p>
</Codeblock>

**Note**: You may assume the string contain only lowercase letters.

```java
class Solution {
  public int firstUniqueChar(String s) {
    int[] chars = new int['z' - 'a' + 1];
    for (char c : s.toCharArray()) {
      chars[c - 'a']++;
    }
    
    for (int i = 0; i < s.length(); i++) {
      if (chars[s.charAt(i) - 'a'] == 1) return i;
    }

    return -1;
  }
}
```

## 557. Reverse Words in a String III

Given a string, you need to reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order

**Example 1:**

<Codeblock>
<p>

</p>
</Codeblock>

### JS
```js
var reverseWords = function(s) {
  let arr = s.split(' ');
  let result = arr.map((itm) => {
    return item.split('').reverse().join('');
  })
  return result.join(' ');
}
```

One line

```js
var reverseWords = function(s) {
  return s.split(' ').map((itm) => {
    return item.split('').reverse().join('');
  }).join(' ');
}
```

Use Regex
```js
var reverseWords = function(s) {
  return s.split(/\s/g).map((itm) => {
    return item.split('').reverse().join('');
  }).join(' ');
}
```

Use match
```js
var reverseWords = function(s) {
  return s.match(/[\w']+/g).map((itm) => {
    return item.split('').reverse().join('');
  }).join(' ');
}
```

## 696. Count Binary Substrings

**Example 1:**

00110011
00110011
00110011
00110011
00110011
00110011

### JS
```js
var countBinarySubstrings = function(s) {
  let r = [];
  // 给定任意子输入都返回第一个复合条件的子串
  let match = (str) => {
    //从字符串起始找到0或者1
    let j = str.match(/^(0+|1+)/)[0];
    let o = (j[0]^1).toString().repeat(j.length);
    let reg = new RegExp(`^(${j}${o})`)
    if (reg.test(str)) {
      return RegExp.$1;
    } else {
      return '';
    }
  }
  for (let i = 0; len = s.length - 1; i < len; i++) {
    let sub = match(s.slice(i));
    if (sub) {
      r.push(sub);
    }
  }
  return r;
}

```