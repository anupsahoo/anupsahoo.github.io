---
layout: post
title: "Develop Tic Tak Toe Game Using Python using tkinter"
subtitle: ""
date: 2019-05-27 23:45:13 -0400
category: python
---

### Develop Tic Tak Toe Game Using Python using tkinter

we are going to build an interactive game of Tic Tac Toe where we’ll learn new things along the way.

1. First of all, define the tk window with the Tk() as the root variable.

2. Then we create the title of the window.

3. Next, we define a variable to store the playable character (say, ‘O’ and ‘X’).

4. Then we define a list to store all the buttons and place them in the window.

5. Finally, we display a label saying the character which has to be played next.

6. We end by a root.mainloop() function to keep events on the main window active and all other widgets interactive.

#### How to do?

One of the most played games is Tic Tac Toe, which is the best time killing game that you can play with only a pen and papers anywhere. Tic-tac-toe (American English), noughts and crosses (Commonwealth English), or Xs and Os, is a game of paper and pencil for two players, X and O, who take turns in a 3/3 grid to locate the spaces. The winner is the player who manages to position three of their marks in a horizontal, vertical, or diagonal row. It's a decided game with a forced draw that means both players play the best
The game is played by two individuals. Next, a board with a 4*4 square grid is drawn. The first player chooses ‘X’ and draws it on any of the square grid, so the second player has the chance to draw ‘O’ on the spaces open. Like this, until a player succeeds in drawing 4 consecutive marks either horizontally, vertically or diagonally, the players draw ‘X’ and ‘O’ alternatively on the empty spaces. Then the player wins the game when all spots are filled, otherwise the game draws.

Importing the required libraries and setting up the required global variables.

1. Designing the game display function, that will set a platform for other components to be displayed on the screen.

2. Main algorithm of win and draw.

3. Getting the user input and displaying the “X” or “O” at the proper position where the user has clicked his mouse.

4. Running an infinite loop, and including the defined methods in it.

![tictaktoe](/assets/images/Screenshot 2020-11-17 at 4.18.58 PM.png) 

**Code Time:**

To do this , we will use some in-built libraries of Python namely which are Tkinter. We define the tk window with the Tk() as the root variable. Then we create the title of the window. Also, in our code, we are using a messagebox class from the Tkinter library to display prompts during the game for the results.

```python
from tkinter import *
import tkinter.messagebox
tk = Tk()
tk.title('Tic-Tac-Toe')
bclick = True
flag = 0
```

**Define Functions:**

Def clearstatus():

The clearstatus() function use to reset the buttons text in the list.

```python
def clearstatus():
    for lis in b:
        for button in lis:
            button["text"] = " "
            button.configure(bg='grey')
```
**Def changecolor(*lis):**

This function is use to change the color of buttons.

```python
def changecolor(*lis):
    for i in lis :
        i.configure(bg='blue')
        i.configure(fg='black')
```
Def check_win():

The check_win() function checks the Tic Tac Toe board to see all the marks of ‘X’ and ‘O’. It calculates whether a player has won the game or not. They can either win when the player has marked 4 consecutive marks in a row, column or diagonally. This function is called every time when we draw a mark ‘X’ or ‘O’ on the board.

```python
def checkForWin(a):

    won=False

    for i in range(4):
        if(b[i][0]["text"]==b[i][1]["text"]==b[i][2]["text"]==b[i][3]["text"]==a ):
            changecolor(b[i][0],b[i][1],b[i][2],b[i][3])
            won=True
            
 if  b[0][i]["text"]==b[1][i]["text"]==b[2][i]["text"]==b[3][i]['text']==a:
            changecolor(b[0][i],b[1][i],b[2][i],b[3][i])
            print('k')
            won=True

    if b[0][0]['text']==b[1][1]['text']==b[2][2]['text']==b[3][3]['text']==a :
        changecolor(b[0][0],b[1][1],b[2][2],b[3][3])
        won=True
    if b[3][0]['text']==b[2][1]['text']==b[1][2]['text']==b[0][3]['text']==a:
        changecolor(b[3][0],b[2][1],b[1][2],b[0][3])
        won=True
 if won:
   
tkinter.messagebox.showinfo("Game-over", f"Player {a} wins!!")
    reset()
 if (flag == 16):
        tkinter.messagebox.showinfo("Game-over", "It's a tie.")
        reset()
```

**Def btnClick():**

Every time the user clicks the mouse button, btnClick() function is activated. When the user clicks the mouse and then we draw the 'XO' on the canvas if that place is not occupied. We also check if, after drawing 'XO' on the board, the player wins or not.

```python

def btnClick(button):
    global bclick, flag
    if button["text"] == " " and bclick == True:
        button.configure(fg='red')
        button["text"] = "X"
        bclick = False

        checkForWin("X")
        lab['text']="O's turn"  
        flag += 1
    elif button["text"] == " " and bclick == False:
        button["text"] = "O"
        button.configure(fg='blue')
        bclick = True

        checkForWin("O")
        lab['text']="x's turn" 
        flag += 1
    elif button["text"] != " ":
        tkinter.messagebox.showinfo("Tic-Tac-Toe", "Button already Clicked!")
```

**Def reset():**

Last, add a restart button and create a refresh function, so that the players can restart the game. We need to set up a feature that can reset all the global values and parameters to initial values for a fresh start of the game before running an infinite loop.

```python
def reset():
    global bclick, flag
    flag, bclick = 0, True
    clearstatus()
    activate()

```

Now, we will check all conditions to check the winning condition, and whatever player has made the last move, we will declare that player the winner. And we'll declare 'tie' or ‘draw’ if no one wins.
We need to build 16 buttons for our 4 * 4 tic-tac-toe grid. Here we’ll give text, font, height, fg ( Normal foreground (text) color), bg (Normal background color). We just want the default color and this is going to be important because when any one player wins it will turn all the winning buttons blue.
We define a list to store all the buttons and place them in the window. Finally, we display a label saying the character which has to be played next. We end by a root.mainloop() function to keep events on the main window active and all other widgets interactive.

We’ve got our code ready now.

And now it’s time to play the game


```python
from tkinter import *
import tkinter.messagebox
tk = Tk()
tk.title('Tic-Tac-Toe')
bclick = True
flag = 0

def clearstatus():
    for lis in b:
        for button in lis:
            button["text"] = " "
            button.configure(bg='grey')

def changecolor(*lis):
    for i in lis :
        i.configure(bg='blue')
        i.configure(fg='black')

   def activate():
    for lis in b:
        for button in lis:
            button.configure(state=NORMAL)


def checkForWin(a):

    won=False

    for i in range(4):
        if(b[i][0]["text"]==b[i][1]["text"]==b[i][2]["text"]==b[i][3]["text"]==a ):
            changecolor(b[i][0],b[i][1],b[i][2],b[i][3])
            won=True
            
 if  b[0][i]["text"]==b[1][i]["text"]==b[2][i]["text"]==b[3][i]['text']==a:
            changecolor(b[0][i],b[1][i],b[2][i],b[3][i])
            print('k')
            won=True

    if b[0][0]['text']==b[1][1]['text']==b[2][2]['text']==b[3][3]['text']==a :
        changecolor(b[0][0],b[1][1],b[2][2],b[3][3])
        won=True
    if b[3][0]['text']==b[2][1]['text']==b[1][2]['text']==b[0][3]['text']==a:
        changecolor(b[3][0],b[2][1],b[1][2],b[0][3])
        won=True
 if won:
   
tkinter.messagebox.showinfo("Game-over", f"Player {a} wins!!")
    reset()
 if (flag == 16):
        tkinter.messagebox.showinfo("Game-over", "It's a tie.")
        reset()


def btnClick(button):
    global bclick, flag
    if button["text"] == " " and bclick == True:
        button.configure(fg='red')
        button["text"] = "X"
        bclick = False

        checkForWin("X")
        lab['text']="O's turn"  
        flag += 1
    elif button["text"] == " " and bclick == False:
        button["text"] = "O"
        button.configure(fg='blue')
        bclick = True

        checkForWin("O")
        lab['text']="x's turn" 
        flag += 1
    elif button["text"] != " ":
        tkinter.messagebox.showinfo("Tic-Tac-Toe", "Button already Clicked!")
# this function is used to reset the current state of the board.

def reset():
    global bclick, flag
    flag, bclick = 0, True
    clearstatus()
    activate()

# these are the settings buttons
button_reset = Button(tk, text="Reset", font='Times 20 bold',
                      bg='red', fg='white', height=1, width=6, command=lambda: reset())
button_reset.grid(row=0, column=1, columnspan=2)

# these are the game buttons
button1 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button1))
button1.grid(row=1, column=0)
button2 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button2))
button2.grid(row=1, column=1)
button3 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button3))
button3.grid(row=1, column=2)
button4 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button4))
button4.grid(row=1, column=3)
button5 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button5))
button5.grid(row=2, column=0)
button6 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button6))
button6.grid(row=2, column=1)
button7 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button7))
button7.grid(row=2, column=2)
button8 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button8))
button8.grid(row=2, column=3)
button9 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button9))
button9.grid(row=3, column=0)
button10 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button10))
button10.grid(row=3, column=1)
button11= Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button11))
button11.grid(row=3, column=2)
button12 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button12))
button12.grid(row=3, column=3)
button13 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button13))
button13.grid(row=4, column=0)
button14 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button14))
button14.grid(row=4, column=1)
button15 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button15))
button15.grid(row=4, column=2)
button16 = Button(tk, text=" ", font='Times 20 bold', bg='gray',
                 fg='red', height=4, width=8, command=lambda: btnClick(button16))
button16.grid(row=4, column=3)
b = [
           [button1, button2, button3, button4],
           [button5, button6, button7, button8],
           [ button9,button10,button11,button12],
           [button13, button14, button15, button16]
    ]
lab=Label(tk, text="X's Turn", font='Times 20 bold',
                      bg='red', fg='white', height=1, width=8)
lab.grid(row=5, column=1, columnspan=2)

tk.mainloop()
```

Out put Images 

![tictaktoe](/assets/images/Screenshot 2020-11-17 at 4.57.39 PM.png) 

![tictaktoe](/assets/images/Screenshot 2020-11-17 at 4.57.55 PM.png) 

![tictaktoe](/assets/images/Screenshot 2020-11-17 at 4.58.07 PM.png) 

