# 树
树在我们的应用程序中非常常见，大部分语言的 Map 数据结构，大多是基于树来实现的。此外还经常会遇到很多其他树结构的变种，比如 MySQL 会使用 B+ 树、MongoDB 会使用 B- 树。其中二叉树是各种树的基础，相关的题目也是变化多样，因此，各大公司都喜欢通过二叉树，考察面试者对语言底层数据结构的理解。

## 二叉树

```java
public class TreeNode {
    int val = 0;
    TreeNode left = null;
    TreeNode right = null;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
}
```

一个树的结点里面分别存放着：

1. 值：用 val 表示

2. 左子结点：用 left 指针表示

3. 右子结点：用 right 指针表示

在我学习二叉树的过程中，发现很多问题实际上都可以通过二叉树的遍历进行求解。 二叉树的遍历可以分为以下 4 种：

1. 前序遍历

2. 中序遍历

3. 后序遍历

4. 层次遍历

### 前序遍历

前序遍历的顺序为：

1. 遍历根结点

2. 左子树

3. 右子树

#### 递归版
```java
void preOrder(TreeNode root, List<Integer> ans) {
  if (root == null) {
    return;
  }

  ans.add(root.val);
  preOrder(root.left, ans);
  preOrder(root.right, ans)
}
```

- 时间复杂度，由于树上的每个结点都只访问一次，并且每次访问都只有一次压栈弹栈操作，所以复杂度为 O(N)。

- 空间复杂度，由于函数调用栈的深度与树的高度有关系，所以使用的空间为 O(H)。H 表示树的高度。（注意：一般而言，输出结果存放的 List 并不算在空间复杂度里面）。

:::tip
提示：在面试时候，你需要问清楚面试官：访问每个结点的时候，是需要 Print 出来，还是放到一个 List 里面返回。搞清楚需求再开始写代码！
:::

#### 非递归版

```java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        // 用来进行递归的栈
        Stack<TreeNode> s = new Stack<>();
        // 用来存放遍历的结果，不算在空间复杂度里面 
        List<Integer> ans = new ArrayList<>();
        // 开始利用栈来进行遍历
        while (root != null || !s.empty()) {
            // 模拟递归的压栈过程
            while (root != null) {
                s.push(root);
                ans.add(root.val);
                root = root.left;
            }
            // 当无法压栈的时候，将root.right进行压栈
            root = s.peek();
            s.pop();
            root = root.right;
        }
        return ans;
    }
}
```