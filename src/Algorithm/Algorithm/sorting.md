# Sorting Algorithm

## Bucket sort

- Bucket sort works by distributing the elements of an array into number of buckets
- Each bucket is then sorted individually

- Create Number of buckets = ceil/floor(squareroot of total number of items)
- Iterate through each number and place it in appropriate bucket
- Appropriate bucket = Ceil((Value * number of buckets)/max value in array)
- Sort all the buckets
- Merge all the buckets

## Insertion Sort

设有一组关键字｛K1， K2，…， Kn｝；排序开始就认为 K1 是一个有序序列；让 K2 插入上述表长为 1 的有序序列，使之成为一个表长为 2 的有序序列；然后让 K3 插入上述表长为 2 的有序序列，使之成为一个表长为 3 的有序序列；依次类推，最后让 Kn 插入上述表长为 n-1 的有序序列，得一个表长为 n 的有序序列。

```cpp
// 维护前k个数字为有序
// 每次将最后一个元素作为插入元素
// 与有序的数列比较后插入正确位置
void insertSort()
{
	for (int i = 0; i < n; i++)
	{
		for (int j = i; j > 0; j--)
		{
			if (a[j] < a[j - 1])
			{
				swap(a[j], a[j - 1]);
			}
			else
			{
				break;
			}
		}
		for (int j = 0; j < n; j++)
		{
			printf("%d ", a[j]);
		}
		printf("\n");
	}
}
```
## Stack Sort

Last in first out (LIFO),后进先出, method有pop, push

时间限制：1 sec

空间限制：256 MB

**问题描述**
给定一个序列 A，请你将它升序排序。

**输入格式**
第一行一个正整数 n，表示序列长度。

第二行 n 个用空格隔开的非负整数，描述这个序列。

**输出格式**
n 行，每行一个非负整数，表示排序后的序列。

**样例输入**
<Codeblock>
<p>
4<br>
1 3 2 10<br>
</p>
</Codeblock>

**样例输出**
<Codeblock>
<p>
1<br>
2<br>
3<br>
10<br>
</p>
</Codeblock>

**数据范围**
保证 n<=1000，保证序列中的数不超过 32767

```cpp
using namespace std;

stack<int> sorting(stack<int>);

int main() {
    int n;
    cin >> n;
    stack<int> myStack;
    for (int i = 0; i < n; ++i) {
        int tmp;
        cin >> tmp;
        myStack.push(tmp);
    }
    stack<int> result = sorting(myStack);
    vector<int> answer;
    while (!result.empty()) {
        answer.push_back(result.top());
        result.pop();
    }
    for (auto i = answer.rbegin(); i != answer.rend(); ++i)
        cout << *i << endl;
    return 0;
}

// myStack：输入栈，栈中的所有元素即是待排序的元素
// 返回值：输出栈，即排序后的序列，满足从栈底至栈顶为升序
stack<int> sorting(stack<int> myStack) {
    /* 请在这里设计你的算法！ */
}
```


## Merge Sort

```js
const mergeSort = (arr) =>  {
	if (arr.length === 1) return arr;

	const center = Math.floor(arr.length / 2);
	// 因为js 3/2 = 1.5所以需要Math.floor
	const left = arr.slice(0, center);
	const right = arr.slice(center);

	return merge(mergeSort(left), mergeSort(right));
}

const merge = (left, right) => {
	const result = [];
	while (left.length && right.length) {
		if (left[0] < right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}
	return [...result, ...left, ...right];
}
```