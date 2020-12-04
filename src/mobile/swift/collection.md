# 集合

## Swift Array

### How to create a new Array

```swift
let array = [1, 2, 3, 4]
```

#### 字面量创建 Array Literal
- 创建空数组的时候必须携带类型信息
```swift
var array:[Int] = []
var array:[String] = []
var arr3:Array<String> = []
```

- 如果内容已经提供了类型信息，比如说作为函数的实际参数或者已经分类了的变量或常量，你可以通过空数组字面量来创建一个空数组
```swift
var array = [1, 2, 3]
array = [] // correct
```

#### 初始化器

使用初始化器有两种方式
- `[类型]()`
- `Array<类型>()`

```swift
var array = [String]()
var a2 = Array<String>()
```

#### 初始化器参数
- init(repeating repeatedValue: Element, count: Int)
```swift
var array = Array(repeating: "Z", count: 5)
print(array) // ["Z", "Z", "Z", "Z", "Z"]
```
- init(arrayLiteral elements: Element…)
```swift
var array = [1, 2, 3]
```
- `init<S>(_ elements: S) where S : Sequence, Self.Element == S.Element`
```swift
let array = [Int](0...7) // 0...7 is range
let array2 = Array(0...7) 
print(array) 
let persons = ["a": 2, "b": 3]
let names = [String](persons.keys)
print(names) // ["a", "b"]
```
- init(from decoder: Decoder) throws

### How to access a new Array

#### Array Iterator
- For in
```swift
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```
- forEach 方法
  - 无法使用 break 或 continue 跳出或者跳过循环
  - 使用 return 只能退出当前一次循环的执行体
  ```swift
  let array = [Int](0...7)
  array.forEach { (num) in
    if num == 3 {
      print(num)
    }
  }
  ```

- 同时得到索引和值 enumerated()
```swift
let array = [Int](0...7)
for (index, num) in array.enumerated() {
  print("\(index) \(num)")
} 
```
- 使用 Iterator 遍历数组
```swift
let array = [Int](2...7)
var numIterator = array.makeIterator()
while let num = numIterator.next() {
  print(num * 10)
}
// 20 30 40 50 60 70
```
::: tip
see more about <a href="https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID121" target="blank">For in</a>
:::

#### Array Index

- startIndex 返回第一个元素的位置，对于数组来说，永远都是 0。
- endIndex 返回最后一个元素索引 +1 的位置，对于数组来说，等同于count 。
- 如果数组为空，startIndex 等于 endIndex 。
- indices 获取数组的索引区间
```swift
let array = [Int](0...7)
for i in array.indices {
  print(i)
} 
// 0, 1, 2, 3, ... 6
```

#### Array check element exist

- contains(_:) 判断数组是否包含给定元素
- contains(where:) 判断数组是否包含符合给定条件的元素
- allSatisfy(_:) 判断数组的每一个元素都符合给定的条件
```swift
// 注意这里用var
var array = [Int](0...7)
var array = [Int](0..<7)
print(array.allSatisfy({ $0 > 4 }))
```

#### Array search element

- first 返回数组第一个元素（optional），如果数组为空，返回 nil 。
- last 返回数组最后一个元素（optional），如果数组为空，返回 nil 。
- first(where:) 返回数组第一个符合给定条件的元素（optional）。
- last(where:) 返回数组最后一个符合给定条件的元素（optional）。
```swift
var a = [10, 20, 45, 30, 101, 30, 4]
print(a.first) // 10
print(a.last) // 4
print(a.first(where: { $0 > 25 })) // 45
print(a.last(where: { $0 > 25 })) // 30
```

#### Array min max

- min() 返回数组中最小的元素
- max() 返回数组中最大的元素
```swift
var array = [Int](1..<7) // [1, 2, 3, 4, 5, 6] ..<表示右边开区间
print(array.min()) // Optional(1)
```

- min(by:) 利用给定的方式比较元素并返回数组中的最小元素
- max(by:) 利用给定的方式比较元素并返回数组中的最大元素
```swift
var array = [(45, "e1"), (23, "e2"), (30, "e3")]
print(array.min { a, b in a.0 < b.0 }) // Optional((23, "e2"))
print(array.max { a, b in a.0 < b.0 }) // Optional((45, "e1"))
```

