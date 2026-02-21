---
layout: post
title: "Develop Tic Tak Toe Game Using Python"
subtitle: ""
date: 2019-05-27 23:45:13 -0400
category: python
---

### Develop Tic Tak Toe Game Using Python

You must have played Tic Tac Toe during your school days, no doubt, and every one of us loves playing the game. You will be surprised to know that the Tic Tac Toe game has been known to exist since the days of ancient Egypt.
In this Python project, We are going to build an interactive game of Tic Tac Toe where we’ll learn new things along the way.

1. We need to print a board..
2. Take in player input.
3. Place their input on the board.
4. Check if the game is won, tied, lost, or ongoing.
5. Repeat until the game has been won or tied.
6. Ask if players want to play again.

#### How 

The game is played by two individuals. Next, a board with a 4*4 square grid is drawn. The first player chooses ‘X’ and draws it on any of the square grid, so the second player has the chance to draw ‘O’ on the spaces open. Like this, until a player succeeds in drawing 4 consecutive marks either horizontally, vertically or diagonally, the players draw ‘X’ and ‘O’ alternatively on the empty spaces. Then the player wins the game when all spots are filled, otherwise the game draws.

![tictaktoe](/assets/images/Screenshot 2020-11-17 at 4.18.58 PM.png) 

**What we are going to do?**
We're going to create a tic-tac - toe game for two teams, which we can play on the command line. We're going to make an empty game board initially and then we're going to take comments from the players and we're going to search for the winning condition and if the whole board gets filled and no one wins, we're going to announce the outcome as "Tie" and ask users if they want the game to restart.

**What we will use?**
Using Python 3, we will create this game, so make sure you have it installed on your laptop / computer and we're ready to go.

**What do we learn?**
We can get a pretty good idea about dictionaries in python after building this game, how to access dictionaries, how to iterate over dictionaries, for loop, if-else conditions and python functions.

**How is the game functioning?**
The board is numerated like the number pad of the keyboard. And thus, by entering the number from the keyboard number pad, a player can make their move on the game board.

**Code Time:**
Next, let's see how we're going to build our game board using a dictionary. A dictionary is a primitive python data type that stores data in the format of "key: value". We will therefore create a dictionary of length 16 and each key will represent a block on the board and the move made by a player will be represented by its corresponding value.
Code 

```python
from IPython.display import clear_output
from tkinter import *
board = {'13': ' ' , '14': ' ' , '15': ' ', '16': ' ',
         '9': ' ' , '10': ' ' , '11': ' ' , '12': ' ',
         '5': ' ' , '6': ' ' , '7': ' ', '8': ' ',
         '1': ' ' , '2': ' ' , '3': ' ', '4': ' ', }
board_keys = []

for key in board:
    board_keys.append(key)
```
And we'll create a printBoardfunction () that we can use any time we want the updated board to be printed in the game.

```python
def PrintBoard(board):
    print(board['13'] + '|' + board['14'] + '|' + board['15'] + '|' + board['16'] )
    print('-+-+-+-')
    print(board['9'] + '|' + board['10'] + '|' + board['11'] +  '|' +board['12'] )
    print('-+-+-+-')
    print(board['5'] + '|' + board['6'] + '|' + board['7'] + '|' + board['8'] )
    print('-+-+-+-')
    print(board['1'] + '|' + board['2'] + '|' + board['3'] + '|' + board['4'] )
    print('-+-+-+-')
```
Initially our game board will look like this:

![tictaktoe](/assets/images/Screenshot 2020-11-17 at 4.33.57 PM.png)  


Now, we'll take the input from the player in the main function first and check whether the input is a correct move or not. If the block to which the player requests to move is correct, we will fill that block, otherwise we will ask the user to pick another block.

```python
def game():
   turn = 'O'
   count= 0
   while True:
      PrintBoard(board)
      move= input("It's your turn "+turn+". Which place do you want to move?")
      clear_output()
        if board[move] ==' ':
            board[move] =turn
            count+=1
        else:
            print("The place is already occupied. Try next one: ")
            continue
```

Now, we will check a total of 10 conditions to check the winning condition, and whatever player has made the last move, we will declare that player the winner. And we'll declare 'tie' or ‘draw’ if no one wins.

```python
#Now we will check if player X or Y won or not
        if board['13']==board['14']==board['15']==board['16'] != ' ':
            print("\n Game over \n")
            print("***** "+turn+" won. ****")
            print("Congratulations!\n")
            break
        elif board['9']==board['10']==board['11']==board['12'] != ' ':
            print("\n Game over \n")
            print("***** " +turn+" won. ****")
            print("Congratulations!\n")
            break
        elif board['5']==board['6']==board['7']==board['8'] != ' ':
            print("\n Game over \n")
            print("***** "+turn+" won. ****")
            print("Congratulations!\n")
            break
        elif board['1']==board['2']==board['3']==board['4'] != ' ':
            print("\n Game over \n")
            print("***** "+turn+" won. ****")
            print("Congratulations!\n")
            break
        elif board['13']==board['9']==board['5']==board['1'] != ' ':
            print("\n Game over \n")
            print("***** "+turn+" won. ****")
            print("Congratulations!\n")
            break
        elif board['14']==board['10']==board['6']==board['2'] != ' ':
            print("\n Game over \n")
            print("***** "+turn+" won. ****")
            print("Congratulations!\n")
            break
        elif board['15']==board['11']==board['7']==board['3'] != ' ':
            print("\n Game over \n")
            print("***** "+turn+" won. ****")
            print("Congratulations!\n")
            break
        elif board['16']==board['12']==board['8']==board['4'] != ' ':
            print("\n Game over \n")
            print("***** "+turn+" won. ****")
            print("Congratulations!\n")
            break
        elif board['13']==board['10']==board['7']==board['4'] != ' ':
            print("\n Game over \n")
            print("***** "+turn+" won. ****")
            print("Congratulations!\n")
            break
        elif board['16']==board['11']==board['6']==board['1'] != ' ':
            print("\n Game over \n")
            print("***** "+turn+" won. ****")
            print("Congratulations!\n")
            break
        #incase neither X or O get won
        if count==16:
            print("Game over!! \n")
            print("The game is Draw!!")
            break
            
        #changing the player
        if turn == 'O':
            turn='X'
        else:
            turn='O'
  restart = input("Do want to play Again?(y/n)")
    if restart == "y" or restart == "Y":  
        for key in board_keys:
            board[key] = " "
            
        game()

if __name__ == "__main__":
    game()

```
