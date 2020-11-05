# Python Generator

## Generator Expression

Simple generators can be easily created on the fly using generator expressions. It makes building generators easy.

Similar to the lambda functions which create anonymous functions, generator expressions create anonymous generator functions

The syntax for generator expression is similar to that of a [list comprehension](./datatypes.md#list-compression) in Python. But the **square** brackets are replaced with **round** parentheses.

The major difference between a list comprehension and a generator expression is that a list comprehension produces the **entire list** while the generator expression **produces one item** at a time.

They have lazy execution ( producing items only when asked for ). For this reason, a generator expression is much more **memory efficient** than an equivalent list comprehension.

```python
# Initialize the list
my_list = [1, 3, 6, 10]

# square each term using list comprehension
list_ = [x**2 for x in my_list]

# same thing can be done using a generator expression
# generator expressions are surrounded by parenthesis ()
generator = (x**2 for x in my_list)

print(list_)
print(generator)
```

**Output:**

```python
[1, 9, 36, 100]
<generator object <genexpr> at 0x7f5d4eb4bf50>
```

We can see above that the generator expression did not produce the required result immediately. Instead, it returned a generator object, which produces items only on demand.

Here is how we can start getting items from the generator:

```python
# Initialize the list
my_list = [1, 3, 6, 10]

a = (x**2 for x in my_list)
print(next(a))

print(next(a))

print(next(a))

print(next(a))

next(a)
```
**Output:**

```python
1
9
36
100
Traceback (most recent call last):
  File "<string>", line 15, in <module>
StopIteration
```

Generator expressions can be used as **function arguments**. When used in such a way, the round parentheses can be dropped.

```python
>>> sum(x**2 for x in my_list)
146

>>> max(x**2 for x in my_list)
100
```