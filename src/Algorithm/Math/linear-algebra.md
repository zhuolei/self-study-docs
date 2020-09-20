# Linear algebra

## 向量(Vector)

向量是线性代数研究的基本元素，为一组数的基本表示方法，最开始为了表示方向，为了研究方便，定义向量丛**原点**（0，0）开始

eg: (6, 66, 666)为三维向量

:::warning
向量的顺序很重要，（4，3）和（3，4）不同，向量是**有序**的数
:::

如果只是表示方向，最多三个维度，n维向量去代表更加抽象的事物

eg: 5维向量，可想象成高维空间的一个点，也可以看成从（0，0，0，0，0）到（120，3，2，2，666）的一个方向
![img](~@pic/img/vector-1.png)

</br>

![img](~@pic/img/vector-2.png)

</br>

![img](~@pic/img/vector-3.png)

## 响量的基本运算

![img](~@pic/img/vector-4.png)

</br>

![img](~@pic/img/vector-5.png)

<br>

![img](~@pic/img/vector-6.png)

</br>

![img](~@pic/img/vector-7.png)

</br>

## 向量运算的基本性质

![img](~@pic/img/vector-8.png)

</br>

### 向量python实现

```python
# Vector in playLA package
class Vector:
    def __init__(self, lst):
        # 用list() copy lst避免用户进行更改
        # 使得class immutable
        # internal variable use single _
        self._values = list(lst)

    def __add__(self, another):
        # 向量加法，返回相加结果
        assert len(self) == len(another), \
            "Error in adding. Length of Vectors must be same"
        # self._values, another._values 不太好这里用迭代器
        # return Vector([a + b for a, b in zip(self._values, another._values)])
        return Vector([a + b for a, b in zip(self, another)])

    def __sub__(self, another):
        # 向量减法，返回相减结果
        assert len(self) == len(another), \
            "Error in subtracting. Length of Vectors must be same"
        return Vector([a - b for a, b in zip(self, another)])

    def __mul__(self, k):
        # 向量乘法，返回相乘结果 (self * k)
        return Vector([k * e for e in self])

    def __rmul__(self, k):
        # 向量乘法，返回相乘结果 (k * self)
        return self * k

    def __pos__(self):
        # 返回向量取正
        # 因为已经定义向量乘法 直接用
        return 1 * self

    def __neg__(self):
        # 返回向量取负
        return -1 * self

    def __iter__(self):
        # 返回向量的迭代器
        return self._values.__iter__()

    def __getitem__(self, index):
        # 取向量的第index个元素
        return self._values[index]

    def __len__(self):
        # 返回向量长度（有多少个元素，及维度）
        return len(self._values)

    # __repr__系统调用
    # The format() method formats the specified value(s) and insert them inside the string's placeholder.
    # The placeholder is defined using curly brackets: {}
    def __repr__(self):
        return "Vector({})".format(self._values)

    # 用户调用
    def __str__(self):
        return "({})".format(", ".join(str(e) for e in self._values))
```

`main.py`

```python
from playLA.Vector import Vector

if __name__ == "__main__":
    vec = Vector([5, 2])
    print(vec)
    print(len(vec))
    print("vec[0] = {}, vec[1] = {}".format(vec[0], vec[1]))

    vec2 = Vector([3, 1])
    print("{} + {} = {}".format(vec, vec2, vec + vec2))
    print("{} - {} = {}".format(vec, vec2, vec - vec2))

    print("{} * {} = {}".format(vec, 3, vec * 3))
    print("{} * {} = {}".format(3, vec, vec * 3))
    print("+{} = {}".format(vec, +vec))
    print("-{} = {}".format(vec, -vec))
```

:::tip
more about [Python generator Expression](../../back-end/Python/generator.md) and [`__str__` `__repr__`](../../back-end/Python/built-in.md#repr-and-str)
:::