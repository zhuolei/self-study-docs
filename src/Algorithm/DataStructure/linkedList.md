# Linked List
## What is a Linked list?

![img](./img/linkedlist.png)

## Comparisions with Arrays
`Lists`
- Do not have indexes
- Connected via nodes with a next pointer
- Random access is not allowed

`Array`
- Indexed in order
- Insertion and deletion can be expensive
- Can quickly be accessed at a specific index

## Code
### Javascript

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {

  }
}
var first = new Node("Hi")
first.next = new Node("there")
```
