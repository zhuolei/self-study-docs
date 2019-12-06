# LinkedList
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