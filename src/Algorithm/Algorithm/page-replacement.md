# Page Replacement Algorithm

In an operating system that uses paging for memory management, a page replacement algorithm is needed to decide which page needs to be replaced when new page comes in.

**Page Fault** – A page fault happens when a running program accesses a memory page that is mapped into the virtual address space, but not loaded in physical memory.

Since actual physical memory is much smaller than virtual memory, page faults happen. In case of page fault, Operating System might have to replace one of the existing pages with the newly needed page. Different page replacement algorithms suggest different ways to decide which page to replace. The target for all algorithms is to reduce the number of page faults.

## First In First Out (FIFO)

This is the simplest page replacement algorithm. In this algorithm, the operating system keeps track of all pages in the memory in a queue, the oldest page is in the front of the queue. When a page needs to be replaced page in the front of the queue is selected for removal.

Example-1 Consider page reference string 1, 3, 0, 3, 5, 6 with 3 page frames.Find number of page faults.

![img](~@pic/img/fifo2.png)

:::tip

:::

```js
const findPageFaults = (arr, len) => {
  const frames = [];
  const num = arr.reduce((acc, itm) => {
    if (frames.length < len) {
      frames.push(itm);
      acc += 1; //
    } else if (!frames.includes(itm)) {
      frames.shift();
      frames.push(itm);
      acc += 1;
    }
    return acc;
  }, 0)
return num;
}

console.log(findPageFaults([1, 3, 0, 3, 5, 6, 3], 3)) // 6

console.log(findPageFaults([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2], 4)) // 7
```