# Tree

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
```
## Basic 

### 剑指 Offer 55 - I. 二叉树的深度
<a href="https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/" target="_blank">Link</a>

输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

例如：

给定二叉树 `[3,9,20,null,null,15,7]`，

![img](~@pic/img/leetcode55-1.png)

#### 解题思路:

<a href="https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/solution/mian-shi-ti-55-i-er-cha-shu-de-shen-du-xian-xu-bia/" target="_blank">关键点： 此树的深度和其左（右）子树的深度之间的关系。显然，此树的深度 等于 左子树的深度 与 右子树的深度 中的 最大值 +1+1</a>

- 终止条件： 当 root​ 为空，说明已越过叶节点，因此返回 深度 00 。
- 递推工作： 本质上是对树做后序遍历。
 - 计算节点 root​ 的 左子树的深度 ，即调用 `maxDepth(root.left)`；
 - 计算节点 root​ 的 右子树的深度 ，即调用 `maxDepth(root.right)`；
- 返回值： 返回 此树的深度 ，即 `max(maxDepth(root.left), maxDepth(root.right)) + 1`。

#### 递归
```java
class Solution {
    public int maxDepth(TreeNode root) {
        if(root == null) return 0;
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}
```

#### BFS
```java
public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    int res = 0;
    while (!queue.isEmpty()) {
        res++;
        int n = queue.size();
        for (int i = 0; i < n; i++) {
            TreeNode node = queue.poll();
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
    }
    return res;
}
```

### 面试题 04.02. 最小高度树
<a href="https://leetcode-cn.com/problems/minimum-height-tree-lcci/" target="_blank">Link</a>

给定一个有序整数数组，元素各不相同且按升序排列，编写一个算法，创建一棵高度最小的二叉搜索树。

![img](~@pic/img/leetcode0402.png)

<a href="https://leetcode-cn.com/problems/minimum-height-tree-lcci/solution/di-gui-gou-jian-by-zui-weng-jiu-xian/" target="_blank">递归构建</a>

```java
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return helper(nums, 0, nums.length - 1);
    }

    public TreeNode helper(int[] nums, int low, int high) {
        if (low > high) {   // low > high表示子数组为空
            return null;
        }
        // 以mid作为根节点
        // 需要加+1
        int mid = (high - low + 1) / 2 + low;
        TreeNode root = new TreeNode(nums[mid]);
        // 左子数组[low, mid -1]构建左子树
        root.left = helper(nums, low, mid - 1);
        // 右子数组[mid + 1, high]构建右子树
        root.right = helper(nums,mid + 1, high);
        return root;
    }
}
```

算法分析
- 数组中的元素都使用1次，时间复杂度为O(n)O(n).
- 递归使用栈辅助空间，空间复杂度O(log(n)).

### 1469. 寻找所有的独生节点

二叉树中，如果一个节点是其父节点的唯一子节点，则称这样的节点为 “独生节点” 。二叉树的根节点不会是独生节点，因为它没有父节点。

给定一棵二叉树的根节点 root ，返回树中 *所有的独生节点的值所构成的数组* 。数组的顺序 *不限* 。

![img](~@pic/img/leetcode1469-1.png)
![img](~@pic/img/leetcode1469-2.png)
![img](~@pic/img/leetcode1469-3.png)

```java
class Solution {
    public List<Integer> getLonelyNodes(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if(root == null || (root.left == null && root.right == null)) return ans;
        helper(root, ans);
        return ans;
    }

    public void helper(TreeNode root, List<Integer> ans) {
        if(root == null || (root.left == null && root.right == null)) return;

        if (root.left != null && root.right == null) ans.add(root.left.val);
        if (root.left == null && root.right != null) ans.add(root.right.val);
        
        if (root.left != null) helper(root.left, ans);
        if (root.right != null) helper(root.right, ans);
    }
}
```

### 617. Merge Two Binary Trees (合并二叉树)

<a href="https://leetcode.com/problems/merge-two-binary-trees/" target="_blank">Link</a>

给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。

**Example 1:**

![img](~@pic/img/617-example-1.png)

**Note:** The merging process must start from the root nodes of both trees.

```js
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
    if(t1 === null || t2 === null) return t1||t2;
    
    t1.val += t2.val;
    t1.left = mergeTrees(t1.left, t2.left);
    t1.right = mergeTrees(t1.right, t2.right);
    
    return t1;
};

// or 

var mergeTrees = function(t1, t2) {
  if(!t1) {
    return t2
  }
  if(!t2) {
    return t1
  }
  
  let root = new TreeNode(t1.val + t2.val);
  root.left = mergeTrees(t1.left, t2.left);
  root.right = mergeTrees(t1.right, t2.right);
  return root;
};
  
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
```

### 100. Same Tree

<a href="https://leetcode.com/problems/same-tree/" target="_blank">Link</a>


Given two binary trees, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical and the nodes have the same value.

**Example 1:**

![img](~@pic/img/100-example-1.png)

**Example 2:**

![img](~@pic/img/100-example-2.png)

**Example 3:**

![img](~@pic/img/100-example-3.png)

```js
var isSameTree = function(p, q) {
    if (!q && !p) return true;
    if (!q || !p) return false
    if (q.val !== p.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

```

### 101. Symmetric Tree
<a href="https://leetcode.com/problems/symmetric-tree/" target="_blank">Link</a>

Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree `[1,2,2,3,4,4,3]` is symmetric:

![img](~@pic/img/101-1.png)

But the following [1,2,2,null,3,null,3] is not:

![img](~@pic/img/101-2.png)

Follow up: Solve it both recursively and iteratively.

:::tip
递归的难点在于：找到可以递归的点 为什么很多人觉得递归一看就会，一写就废。 或者说是自己写无法写出来，关键就是你对递归理解的深不深。

对于此题： 递归的点怎么找？从拿到题的第一时间开始，思路如下：

1.怎么判断一棵树是不是对称二叉树？ 答案：如果所给根节点，为空，那么是对称。如果不为空的话，当他的左子树与右子树对称时，他对称

2.那么怎么知道左子树与右子树对不对称呢？在这我直接叫为左树和右树 答案：如果左树的左孩子与右树的右孩子对称，左树的右孩子与右树的左孩子对称，那么这个左树和右树就对称。

仔细读这句话，是不是有点绕？怎么感觉有一个功能A我想实现，但我去实现A的时候又要用到A实现后的功能呢？

当你思考到这里的时候，递归点已经出现了： 递归点：我在尝试判断左树与右树对称的条件时，发现其跟两树的孩子的对称情况有关系。

想到这里，你不必有太多疑问，上手去按思路写代码，函数A（左树，右树）功能是返回是否对称

def 函数A（左树，右树）： 左树节点值等于右树节点值 且 函数A（左树的左子树，右树的右子树），函数A（左树的右子树，右树的左子树）均为真 才返回真
:::

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isSymmetric = (root) => {
    if (root === null) return true;
    return checkSymmetric(root.left, root.right);
};

const checkSymmetric = (left, right) => {
    if (left === null && right === null) return true;
    if (left === null || right === null) return false;
    if (left.val !== right.val) return false;
    return checkSymmetric(left.left, right.right) && checkSymmetric(left.right, right.left);
}
```

## Inorder

### 530. 二叉搜索树的最小绝对差

<a href="https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/" target="_blank">Link</a>

给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。

![img](~@pic/img/leetcode-530.png)

提示:
- 树中至少有 2 个节点。
- 本题与 <a href="https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/">783</a> 相同

#### 解题思路:

<a href="https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/solution/di-gui-he-fei-di-gui-liang-chong-jie-fa-zui-hao-de/" target="_blank">其实考察的是二叉搜索树的中序遍历，因为二叉搜索树的中序遍历结果是升序的，我们只需要在中序遍历的时候和前一个节点比较，保存最小的差值即可。</a>

#### 递归
```java
class Solution {
    int min = Integer.MAX_VALUE;
    TreeNode pre;

    public int getMinimumDifference(TreeNode root) {
        inOrder(root);
        return min;
    }

    private void inOrder(TreeNode root) {
        if (root == null) {
            return;
        }

        inOrder(root.left);
        if (pre != null) {
            min = Math.min(min, root.val - pre.val);
        }
        pre = root;
        inOrder(root.right);
    }
}
```

:::tip
<a href="https://mp.weixin.qq.com/s?__biz=MzU0ODMyNDk0Mw==&mid=2247487028&idx=1&sn=e06a0cd5760e62890e60e43a279a472b&chksm=fb419d14cc36140257eb220aaeac182287b10c3cab5c803ebd54013ee3fc120d693067c2e960&token=2098074806&lang=zh_CN#rd" target="_blank">373，数据结构-6,树</a>
:::
#### 非递归

二叉树的中序遍历如下

```java
public static void inOrderTraversal(TreeNode tree) {
    Stack<TreeNode> stack = new Stack<>();
    while (tree != null || !stack.isEmpty()) {
        while (tree != null) {
            stack.push(tree);
            tree = tree.left;
        }
        if (!stack.isEmpty()) {
            tree = stack.pop();
            System.out.println(tree.val);
            tree = tree.right;
        }
    }
}
```

```java
public int getMinimumDifference(TreeNode root) {
    int min = Integer.MAX_VALUE;
    Stack<TreeNode> stack = new Stack<>();
    TreeNode cur = root, prev = null;
    while (cur != null || !stack.empty()) {
        if (cur != null) {
            stack.push(cur);
            cur = cur.left;
        } else {
            cur = stack.pop();
            //在这里进行改造
            if (prev != null)
                min = Math.min(min, cur.val - prev.val);
            prev = cur;
            
            cur = cur.right;
        }
    }
    return min;
}
```

### 783. 二叉搜索树节点最小距离

<a href="https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/" target="_blank">Link</a>

给你一个二叉搜索树的根节点 root ，返回 **树中任意两不同节点值之间的最小差值** 。

注意：本题与<a href="https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/">530</a> 相同
