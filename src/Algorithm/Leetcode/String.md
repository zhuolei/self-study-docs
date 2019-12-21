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