---
layout: post
title: " How to use context manager? "
subtitle: ""
date: 2020-06-03 23:45:13 -0400
category: python
---
### How to use context manager?

Context managers allow you precisely to assign and release resources when you want to.
The most frequently used example of context managers is the statement of with. 
Suppose you have two similar operations with a block of code in between that you would 
like to execute as a pair. Context managers allow you to do that directly. For instance:

```
with open('some_file', 'w') as opened_file:
    opened_file.write('Hello World!')
```

The code above opens the file, writes some details to the file and then closes it. If an error occurs 
when the data is being written to the register, it will attempt to close it. The code given above is equivalent to:

```
file = open('some_file', 'w')
try:
    file.write('Hello World!')
finally:
    file.close()
```    

We can see that a lot of boilerplate code is avoided just by using it when comparing it to the first case. 
The primary benefit of using a declaration is that it guarantees that our file is closed without paying attention 
to how the nested block leaves.
Context managers are typically used to lock and unlock resources and close opened files (as shown above ).

Let's see if we can incorporate a Context Manager of our own. This should allow us to know exactly 
what is happening behind the scenes.

**A Context Manager implemented as a Class:**
At the very least a context manager has an__ enter__ and __exit__ method defined. 
Let’s make our own file-opening Context Manager and learn the basics.

```
class File(object):
    def __init__(self, file_name, method):
        self.file_obj = open(file_name, method)        
    def __enter__(self):    
        return self.file_obj        
    def __exit__(self, type, value, traceback):    
        self.file_obj.close()
```
        
We can only use our new class in a sentence by 
specifying the methods of entering and exiting. We're going to try:        
        
``` with File('demo.txt', 'w') as opened_file: 
    opened_file.write('Hello World!')
```
  
Three arguments are accepted by our __ exit__ method. Every __exit__ method, 
which is part of a Context Manager class, needs them. Let’s talk about what's 
going to happen under the hood.
1. The statement stores the file class's __exit__ process.
2. The __enter__ method of the file class is called.
3. The method __enter__ opens the file and returns it.
4. The file handle that is opened is transferred to opened_file.
5. Using .write() we write to the paper.
6. The statement calls the stored method __exit__  .
7. The method __exit__ closes the file.   
 
**Handling Exceptions:**

We did not speak about the __exit__ method's form, value and traceback arguments. 
Python transfers the sort, value and traceback of the exception to 
the __exit__ method between the 4th and 6th steps if an exception happens. 
This enables the __exit__ method to determine how to close the file and if 
further steps are required. In our situation, we pay no attention to them at all.
What if an exception is created by our file object? We may be trying to access a 
method that is not supported by the file object. For example: 

```
with File('demo.txt', 'w') as opened_file:
    opened_file.undefined_function('Hello World!')
```
 
Let's list the steps the declaration takes when an error is encountered:

1. It passes the error form, value and traceback to the method __exit__ .
2. This enables the exception to be treated by the __exit__ technique.
3. If the __exit__ returns real, then the exception has been treated gracefully. 
4. The exception is posed by the statement if something other than True is 
returned by the __exit__ process.
5. The __exit__ method returns none in our case (when no return statement is found, 
the method returns none). Therefore, the exception is posed in the statement:    
 
Let's try to tackle the exit process exception:
    
```
class File(object):`   
    `def __init__(self, file_name, method):`   
        self.file_obj = open(file_name, method)
        
    def __enter__(self):
        return self.file_obj
        
    def __exit__(self, type, value, traceback):
        print("Exception has been handled")
        self.file_obj.close()
        return True`
        
    `with File('hello.txt', 'w') as opened_file:
    opened_file.undefined_function()
```
       
Therefore, no exception was posed by the argument with our __exit__ method returned true.
This isn't the only way Context Managers can be applied. There is another route, 
and in the next segment we will be looking at it.

**Implementing a Context Manager as a Generator:**

Using decorators and generators, we can also introduce Context Managers. 
For this very reason, Python has a context-lib module. We may implement a 
Context Manager instead of a class, using a generator function. 
Let’s look at a fundamental, useless example:        

```
from contextlib import contextmanager
@contextmanager
def open_file(name):
    f = open(name, 'w')`
    
    try:
        yield f
    finally:
        f.close()
```
  
All right! It appears that this way of applying Context Managers is more intuitive 
and simple. This technique, however, requires some knowledge of generators, 
performance and decorators. We haven't caught any exceptions in this example 
that could occur. It mostly works in the same way as the previous process.
And dissect this strategy a little bit.
1. Python follows the keyword for yield. Due to this, instead of a normal function, 
a generator is generated.
2. The contextmanager is named with the function name (open_file) as its statement 
because of the decoration.
3. A generator wrapped by the GeneratorContextManager object is returned by the 
contextmanager decorator. 
4. The open_file function is allocated to the GeneratorContextManager. 
Therefore, we directly call the GeneratorContextManager object 
when we call the open_file function later.

So now that we know all of this, the newly created Context Manager 
can be used like this:
        
```
with open_file('some_file') as f:
    f.write('Hello World!') 
```