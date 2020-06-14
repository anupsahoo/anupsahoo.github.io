---
layout: post
title: "Top 10 Mistakes that python programmers make"
subtitle: ""
date: 2020-06-03 23:45:13 -0400
category: python
---
Python is known to have a simple syntax and uncomplicated semantics and applicability globally. Despite this fact, 
there is some widespread mistake that a python developer makes. Let us take you through some prevalent errors.
##### Errors
Errors are called as a traceback—errors like indenting gone wrong, or a mistaken additional space while indenting. 
Any coding you do, errors are an inevitable part of the coding process. In Python, the coding suffers an error called
 omitting a parenthesis or forgetting a colon at the end of a line. All will come back with a traceback syntax error.
##### Indentation issues
Most languages use indentation to make the code or blocks of codes isolated to make it look cleaner. In Python, 
indents are a part of the code. The editor will read the spaces or indents as a part of the code itself. Python has a 
specific way of introducing an indent. If done incorrectly, the code that is being seen is very different from the 
one being by reading by the editor.
##### Class variables
Class variables have an MRO or a Method Resolution Order (MRO). In Python, the class variable is a part of dictionaries. These dictionaries follow the MRO to define an explicit search path for that variable. It is used as a robust solution for searching in classes that have a multi inheritance. Unless handled properly, it causes a problem and leads to an error.
##### Init usage
Init is a part of object-oriented technology or OOPS. Init is a method in Python and falls under the category of 
constructors. It is mainly used in classes when a class creates an object, and the object starts to inherit the 
attributed to that class. Most developers use init () to return a value which isolates it from how it is supposed 
to work.
##### Late variable binding
Most developers don’t realize that Python suffers from late-binding behavior. It means that variables are bound in 
small class closures and are only initiated or called upon when the inner function is set in action. You must take 
this into account while coding to avoid errors.
##### Confusing library modules
Python has library modules that get imported when used in the code. If you use a module name similar to a library 
module, it will import the library module and supersede your code. This will lead to unexpected behavior and error.
##### Variable scoping
Local Enclosing Global Built (LEGB) is used to scope variables. If a variable is assigned, Python automatically 
assigns a local scope to that variable. Due to this, any similarly named variable in the outer scope starts behaving 
the same way. This leads to error, which is most common while using lists.
##### Modification issues
The most common problem with python developers is they tend to delete an element while the list or array is iterating.
 This will lead to a syntax error, which is called IndexError. You can counter this through list comprehensions.
##### Dependencies
Library modules sometimes cause circular dependencies. E.g., if you have two files that run dependent on each other, 
you will never have a conclusive code. They will keep importing each other.
##### Exception function
Developers are lazy to use the exception function to catch errors. Python is a sophisticated tool when it comes to 
error sanitization. Usage of exceptions like the try-catch block, show you where exactly the problem lies and saves time.

