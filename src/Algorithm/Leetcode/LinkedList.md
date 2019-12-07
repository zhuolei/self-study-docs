# LinkedList
```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
```
## 206. Reverse Linked List

Reverse a singly linked list.

**Example:**

`Input: 1->2->3->4->5->NULL`

`Output: 5->4->3->2->1->NULL`

**Follow up:**

A linked list can be reversed either iteratively or recursively. Could you implement both?

```java
public class ReverseLinkedList {
  /**
  像铺砖一样从head那段路拿砖然后铺到pre那段路上
  time: O(n)
  space: O(1)
  */
    public static ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode pre = null;
        while (head != null) {
        // 3 -> 4 -> 5 => 5 -> 4 -> 3
        ListNode temp = head.next; // 3(h) -> 4(t) -> 5
        head.next = pre; // 3(h) -> null(pre) 4 -> 5
        pre = head; // 3(pre) -> null   4 -> 5
        head = temp; // 3(pre) -> null   4(h) -> 5
        }
        return pre;
    }
}
```

## 141. Linked List Cycle

Given a linked list, determine if it has a cycle in it.

To represent a cycle in the given linked list, we use an integer `pos` which represents the position (0-indexed) in the linked list where tail connects to. If `pos` is -1, then there is no cycle in the linked list.

**Example 1:**

<Codeblock>
<p>Input: head = [3,2,0,-4], pos = 1<br>
Output: true<br>
Explanation: There is a cycle in the linked list, where tail connects to the second node.<br>
</p>
</Codeblock>

**Example 2:**

<Codeblock>
<p>Input: head = [1,2], pos = 0<br>
Output: true<br>
Explanation: There is a cycle in the linked list, where tail connects to the first node.<br>
</p>
</Codeblock>

**Example 3:**

<Codeblock>
<p>Input: head = [1], pos = -1<br>
Output: false<br>
Explanation: There is no cycle in the linked list.<br>
</p>
</Codeblock>

```java
public class Solution {
    /**
    可以按追击问题理解，当它为环时,慢的pointer走完一圈的时候，快的pointer正好走完两圈，他俩相遇
    */
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;

        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
}
```

## 24. Swap Nodes in Pairs

Given a linked list, swap every two adjacent nodes and return its head.

You may **not** modify the values in the list's nodes, only nodes itself may be changed.

**Example:**

<Codeblock>
<p>Given 1->2->3->4, you should return the list as 2->1->4->3.</p>
</Codeblock>

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 * time: O(n)
 * space: O(1)
 */
class Solution {
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode l1 = dummy; // l1 -> 1 -> 2 -> 3 -> 4
        ListNode l2 = head;  //       l2
        while (l2 != null && l2.next != null) {
            ListNode nextStart = l2.next.next; // 0(l1) -> 1(l2) -> 2 -> 3(nextStart) -> 4
            l1.next = l2.next; // 1(l2) 和 0(l1) 共同-> 2 -> 3(nextStart) -> 4
            l2.next.next = l2; 
            // 1(l2) 和 0(l1) 共同-> 2 -> 3(nextStart) -> 4
            //           1(l2)<---- 2 形成一个环
            l2.next = nextStart; // 0(l1) -> 2 -> 1(l2) -> 3(nextStart) -> 4
            l1 = l2; // 0(dummy) -> 2 -> 1(l2 l1) -> 3(nextStart) -> 4
            l2 = l2.next; // 0(dummy) -> 2 -> 1(l1) -> 3(nextStart l2) -> 4
        }
        return dummy.next;
    }
}
```