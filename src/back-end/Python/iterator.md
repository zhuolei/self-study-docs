# Python Iterator

## Definition

Iterators are everywhere in Python. They are elegantly implemented within for loops, comprehensions, generators etc. but are hidden in plain sight.

Iterator in Python is simply an object that can be iterated upon. An object which will return data, one element at a time.

Technically speaking, a Python iterator object must implement two special methods, `__iter__()` and `__next__()`, collectively called the iterator protocol.

An object is called **iterable** if we can get an iterator from it. Most built-in containers in Python like: list, tuple, string etc. are iterables.

The `iter()` function (which in turn calls the `__iter__()` method) returns an iterator from them.