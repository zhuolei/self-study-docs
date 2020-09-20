# Python Built in var and function

## __name__

Since there is no main() function in Python, when the command to run a python program is given to the interpreter, the code that is at level 0 indentation is to be executed. However, before doing that, it will define a few special variables. `__name__` is one such special variable. If the source file is executed as the main program, the interpreter sets the `__name__` variable to have a value “`__main__`”. If this file is being imported from another module, `__name__` will be set to the module’s name.

**`__name__` is a built-in variable which evaluates to the name of the current module.** Thus it can be used to check whether the current script is being run on its own or being imported somewhere else by combining it with if statement, as shown below.

**File1**
```python
print("File1 __name__ = %s" %__name__)
  
if __name__ == "__main__": 
    print("File1 is being run directly")
else: 
    print("File1 is being imported")
```

**File2**
```python
import File1 
  
print "File2 __name__ = %s" %__name__ 
  
if __name__ == "__main__": 
    print "File2 is being run directly"
else: 
    print "File2 is being imported"
```

**Output**
```
Now the interpreter is given the command to run File1.py.
python File1.py
Output :
File1 __name__ = __main__
File1 is being run directly


And then File2.py is run.
python File2.py
Output :
File1 __name__ = File1
File1 is being imported
File2 __name__ = __main__
File2 is being run directly
```

## zip()

The zip() function takes iterables (can be zero or more), aggregates them in a tuple, and return it.

`zip(*iterables)`: `iterables` can be built-in iterables (like: list, string, dict), or user-defined iterables

### Return value

The `zip()` function returns an iterator of tuples based on the iterable objects.

- If we do not pass any parameter, `zip()` returns an empty iterator
- If a single iterable is passed, `zip()` returns an iterator of tuples with each tuple having only one element.
- If multiple iterables are passed, `zip()` returns an iterator of tuples with each tuple having elements from all the iterables.

Suppose, two iterables are passed to `zip()`; one iterable containing three and other containing five elements. Then, the returned iterator will contain three tuples. It's because iterator stops when the shortest iterable is exhausted.

**Example 1**
```python
number_list = [1, 2, 3]
str_list = ['one', 'two', 'three']

# No iterables are passed
result = zip()

# Converting itertor to list
result_list = list(result)
print(result_list)

# Two iterables are passed
result = zip(number_list, str_list)

# Converting itertor to set
result_set = set(result)
print(result_set)
```

**Output**
```python
[]
{(2, 'two'), (3, 'three'), (1, 'one')}
```

**Example 2 Different number of iterable elements**
```python
numbersList = [1, 2, 3]
str_list = ['one', 'two']
numbers_tuple = ('ONE', 'TWO', 'THREE', 'FOUR')

# Notice, the size of numbersList and numbers_tuple is different
result = zip(numbersList, numbers_tuple)

# Converting to set
result_set = set(result)
print(result_set)

result = zip(numbersList, str_list, numbers_tuple)

# Converting to set
result_set = set(result)
print(result_set)
```

**Output**
```py
{(2, 'TWO'), (3, 'THREE'), (1, 'ONE')}
{(2, 'two', 'TWO'), (1, 'one', 'ONE')}
```

### Unzip
The * operator can be used in conjunction with zip() to unzip the list.

**Example 3**
```python
coordinate = ['x', 'y', 'z']
value = [3, 4, 5]

result = zip(coordinate, value)
result_list = list(result)
print(result_list)

c, v =  zip(*result_list)
print('c =', c)
print('v =', v)
```

**Output**
```python
[('x', 3), ('y', 4), ('z', 5)]
c = ('x', 'y', 'z')
v = (3, 4, 5)
```

## repr() and str()

The repr() function returns a printable representation of the given object. The syntax of repr() is:

`repr(obj)`

### Parameters

The **repr()** function takes a single parameter:

- obj - the object whose printable representation has to be returned

The **str()** method takes three parameters:

- object - The object whose string representation is to be returned. If not provided, returns the empty string
- encoding - Encoding of the given object. Defaults of UTF-8 when not provided.
- errors - Response when decoding fails. Defaults to 'strict'.

There are six types of errors:

- strict - default response which raises a UnicodeDecodeError exception on failure
- ignore - ignores the unencodable Unicode from the result
- replace - replaces the unencodable Unicode to a question mark
- xmlcharrefreplace - inserts XML character reference instead of unencodable Unicode
- backslashreplace - inserts a \uNNNN espace sequence instead of unencodable Unicode
- namereplace - inserts a \N{...} escape sequence instead of unencodable Unicode
### Return value

str() and repr() both are used to get a string representation of object.

### How them works in Python?

`repr()`
```python
s = 'Hello, Geeks.'
print repr(s) 
print repr(2.0/11.0) 
```
**Output:**
```python
'Hello, Geeks.'
0.18181818181818182
```

`str()`
```python
s = 'Hello, Geeks.'
print str(s) 
print str(2.0/11.0) 
```

**Output:**
```python
Hello, Geeks.
0.181818181818
```
From above output, we can see if we print string using repr() function then it prints with a pair of quotes and if we calculate a value we get more precise value than str() function.

When the result from repr() is passed to eval(), we will get the original object (for many types).

```python
>>> eval(repr(var))
'foo'
```

### Differences

- str() is used for creating output for end user while repr() is mainly used for debugging and development. repr’s goal is to be unambiguous and str’s is to be readable.
- repr() compute the “official” string representation of an object (a representation that has all information about the object) and str() is used to compute the “informal” string representation of an object (a representation that is useful for printing the object).
- The print statement and str() built-in function uses `__str__` to display the string representation of the object while the repr() built-in function uses `__repr__` to display the object.
- `__str__ `must return string object whereas `__repr__` can return any python expression.
- If `__str__` implementation is missing then `__repr__` function is used as fallback. There is no fallback if `__repr__` function implementation is missing.
- If __repr__ function is returning String representation of the object, we can skip implementation of __str__ function.

**Example**
```python

edit
play_arrow

brightness_4
import datetime 
today = datetime.datetime.now() 
  
# Prints readable format for date-time object 
print str(today) 
  
# prints the official format of date-time object 
print repr(today) 
```

**Output**
```python
2016-02-22 19:32:04.078030
datetime.datetime(2016, 2, 22, 19, 32, 4, 78030)
```

### How to make them work for our own defined classes?

```python
# Python program to demonstrate writing of __repr__ and 
# __str__ for user defined classes 
  
# A user defined class to represent Complex numbers 
class Complex: 
  
    # Constructor 
    def __init__(self, real, imag): 
       self.real = real 
       self.imag = imag 
  
    # For call to repr(). Prints object's information 
    def __repr__(self): 
       return 'Rational(%s, %s)' % (self.real, self.imag)     
  
    # For call to str(). Prints readable form 
    def __str__(self): 
       return '%s + i%s' % (self.real, self.imag)     
  
  
# Driver program to test above 
t = Complex(10, 20) 
  
print str(t)  # Same as "print t" 
print repr(t) 
```

**Output**

```
10 + i20
Rational(10, 20)
```

```python
class Person:
    name = ""
    age = 0

    def __init__(self, personName, personAge):
        self.name = personName
        self.age = personAge

    # must return, otherwise repr(p) will throw TypeError: __repr__ returned non-string (type dict)
    def __repr__(self):
        return '{name:'+self.name+', age:'+str(self.age)+ '}'

    def __str__(self):
        return 'Person(name='+self.name+', age='+str(self.age)+ ')'

p = Person('Pankaj', 34)

# __str__() example
print(p)
print(p.__str__())

s = str(p)
print(s)

# __repr__() example
print(p.__repr__())
print(type(p.__repr__()))
print(repr(p))
```

**Output**

```python
Person(name=Pankaj, age=34)
Person(name=Pankaj, age=34)
Person(name=Pankaj, age=34)
{name:Pankaj, age:34}
<class 'str'>
{name:Pankaj, age:34}
```