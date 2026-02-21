---
layout: post
title: "How to Use Context Manager?"
subtitle: "Understanding Python's Context Managers for Resource Management"
date: 2020-07-14 23:45:13 -0400
category: python
---
### How to Use Context Manager?

Context managers allow you to precisely assign and release resources when needed. The most frequently used example of context managers is the `with` statement. Suppose you have two similar operations with a block of code in between that you would like to execute as a pair. Context managers allow you to do that directly. For instance:

```python
with open('some_file', 'w') as opened_file:
    opened_file.write('Hello World!')
```

The code above opens a file, writes some data to it, and then closes it. If an error occurs when the data is being written, it will attempt to close the file. The code above is equivalent to:

```python
file = open('some_file', 'w')
try:
    file.write('Hello World!')
finally:
    file.close()
```    

We can see that a lot of boilerplate code is avoided by using the `with` statement compared to the first case. The primary benefit of using the `with` statement is that it guarantees our file is closed regardless of how the nested block exits. Context managers are typically used to lock and unlock resources and close opened files (as shown above).

Let's see if we can incorporate a Context Manager of our own. This should allow us to know exactly 
what is happening behind the scenes.

**A Context Manager Implemented as a Class:**
At a minimum, a context manager has `__enter__` and `__exit__` methods defined. Let's make our own file-opening context manager to learn the basics.

```python
class File(object):
    def __init__(self, file_name, method):
        self.file_obj = open(file_name, method)        
    def __enter__(self):    
        return self.file_obj        
    def __exit__(self, type, value, traceback):    
        self.file_obj.close()
```
        
We can use our new class in a `with` statement by specifying the `__enter__` and `__exit__` methods. Let's try it:
        
```python
with File('demo.txt', 'w') as opened_file: 
    opened_file.write('Hello World!')
```
  
Three arguments are accepted by our `__exit__` method. Every `__exit__` method that is part of a context manager class needs them. Let's discuss what's happening under the hood:
1. The `with` statement stores the file class's `__exit__` method.
2. The `__enter__` method of the file class is called.
3. The `__enter__` method opens the file and returns it.
4. The opened file handle is transferred to `opened_file`.
5. Using `.write()`, we write to the file.
6. The `with` statement calls the stored `__exit__` method.
7. The `__exit__` method closes the file.   
 
**Handling Exceptions:**

We didn't discuss the `__exit__` method's `type`, `value`, and `traceback` arguments. Python transfers the type, value, and traceback of the exception to the `__exit__` method if an exception occurs between the 4th and 6th steps. This enables the `__exit__` method to determine how to close the file and if further steps are required. In our situation, we ignore them completely.

What if an exception is raised by our file object? We might try to access a method that is not supported by the file object. For example:

```python
with File('demo.txt', 'w') as opened_file:
    opened_file.undefined_function('Hello World!')
```
 
Let's list the steps the `with` statement takes when an error is encountered:

1. It passes the error type, value, and traceback to the `__exit__` method.
2. This enables the exception to be handled by the `__exit__` method.
3. If the `__exit__` returns `True`, then the exception has been handled gracefully.
4. The exception is raised by the `with` statement if anything other than `True` is returned by the `__exit__` method.
5. The `__exit__` method returns `None` in our case (when no return statement is found, the method returns `None`). Therefore, the exception is raised by the `with` statement.
 
Let's try to handle the exception in the `__exit__` method:

```python
class File(object):
    def __init__(self, file_name, method):
        self.file_obj = open(file_name, method)
        
    def __enter__(self):
        return self.file_obj
        
    def __exit__(self, type, value, traceback):
        print("Exception has been handled")
        self.file_obj.close()
        return True
        
with File('hello.txt', 'w') as opened_file:
    opened_file.undefined_function()
```
       
Therefore, no exception was raised by the `with` statement since our `__exit__` method returned `True`. This isn't the only way context managers can be implemented. There is another approach, and in the next section, we will look at it.

**Implementing a Context Manager as a Generator:**

Using decorators and generators, we can also implement context managers. For this reason, Python has a `contextlib` module. We can implement a context manager using a generator function instead of a class. Let's look at a fundamental example:

```python
from contextlib import contextmanager

@contextmanager
def open_file(name):
    f = open(name, 'w')
    
    try:
        yield f
    finally:
        f.close()
```
  
Alright! This way of implementing context managers appears more intuitive and simple. However, this technique requires some knowledge of generators, performance, and decorators. We haven't caught any exceptions that could occur in this example. It mostly works in the same way as the previous approach. Let's dissect this strategy a bit:

1. Python follows the `yield` keyword. Due to this, a generator is created instead of a normal function.
2. The `contextmanager` decorator is called with the function name (`open_file`) as its statement because of the decoration.
3. A generator wrapped by the `GeneratorContextManager` object is returned by the `contextmanager` decorator.
4. The `open_file` function is assigned to the `GeneratorContextManager`. Therefore, we directly call the `GeneratorContextManager` object when we call the `open_file` function later.

So now that we know all of this, the newly created context manager can be used like this:

```python
with open_file('some_file') as f:
    f.write('Hello World!') 
```
