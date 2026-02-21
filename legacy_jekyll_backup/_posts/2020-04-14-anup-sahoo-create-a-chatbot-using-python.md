---
layout: post
title: " How to build your first chatbot using NLTK & Keras? "
subtitle: ""
date: 2020-07-03 23:45:13 -0400
category: python
---
### How to build your first chatbot using NLTK & Keras?

For business organizations and even for companies, chat bots are extremely helpful. Instead of calling service centers, most people tend to **communicate directly** from a chat box. Data that proved the worth of bots was released by Facebook. More than **2 billion messages** are sent monthly between individuals and businesses. The Hub Spot study informs us that **71 percent of individuals want messaging apps** to get customer service. It is a fast way to **solve their problems** so that chat bots have a bright organizational future.
We will  learn create an exciting Chatbot today. 

From scratch, we will introduce a **chatbot** that will be able to understand what the user is talking about and provide a suitable answer.

**What is Chatbot?**
A chatbot is an intelligent piece of software capable of interacting and carrying out human-like acts. In **customer interaction**, ads on social network websites and **instant messaging** to the client, chat bots are used a lot. Based on how they are designed, there are two basic types of chatbot models; **Retrieval based and Generative based models**.

**1. Retrieval based Chat bots:**

**Predefined input patterns and answers** are used by a retrieval-based chatbot. To pick the appropriate answer, it then uses some kind of heuristic approach. In the industry, it is commonly used to build goal-oriented chat bots where we can change the chatbot 's tone and flow to drive our customers with the best experience.

**2. Generative based Chat bots:**

Generative models do not depend on any predefined answers.
They are based on **Neural Networks seq 2 seq**. As with machine translation, it is the same concept. We convert the source code from one language to another language in machine translation, but here, we will turn the input into an output. It needs a large amount of data and is based on the networks of Deep Neural.

**Prerequisites**

To implement the chatbot, we will be using Keras, which is a Deep Learning library, NLTK, which is a Natural Language Processing toolkit, and some helpful libraries. Run the below command to make sure all the libraries are installed:
pip install tensorflow keras pickle nltk

**How do Chat bots Work?**

Chat bots are nothing but a smart piece of software that, much like humans, can connect and communicate with individuals. Interesting, aren't they? So now let's see how they work, actually.
The NLP (Natural Language Processing) principles include all chat bots. NLP is made up of two things:
NLU (Natural Language Understanding): Machines' capacity, like English, to understand human language.
NLG (Natural Language Generation): A machine's ability to create text that is similar to human written sentences.

**Project File Structure**

After the project is complete, you will be left with all these files. Lets quickly go through each of them. It will give you an idea of how the project will be implemented.
1. Train_chatbot.py — In this file, we will build and train the deep learning model that can classify and identify what the user is asking to the bot.

2. Gui_Chatbot.py — This file is where we will build a graphical user interface to chat with our trained chatbot.

3. Intents.json — The intents file has all the data that we will use to train the model. It contains a collection of tags with their corresponding patterns and responses.

4. Chatbot_model.h5 — This is a hierarchical data format file in which we have stored the weights and the architecture of our trained model.

5. Classes.pkl — The pickle file can be used to store all the tag names to classify when we are predicting the message.

6. Words.pkl — The words.pkl pickle file contains all the unique words that are the vocabulary of our model.

**How to Build Your Own Chatbot**

I’ve simplified the building of this chatbot in 5 steps:

**Step 1. Import Libraries and Load the Data**

Build and name a new python file as a train chatbot and then we will import all the necessary modules. We are going to read the JSON data file in our Python programme after that.

```python
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import SGD
import random
import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import json
import pickle

intents_file = open('intents.json').read()
intents = json.loads(intents_file)
```

**Step-2 Pre processing the Data**

The raw data cannot be taken by the model. For the computer to understand quickly, it has to go through a lot of pre-processing. There are several preprocessing techniques available for textual data. The first strategy is tokenizing, in which we split the phrases into words.
We can see that each tag contains a list of patterns and responses by analyzing the purpose file. Each pattern is tokenized and we add the words to a list. We also produce a list of classes and documents to add all the pattern-related intents.

```python
words=[]
classes = []
documents = []
ignore_letters = ['!', '?', ',', '.']
for intent in intents['intents']:
    for pattern in intent['patterns']:
        #tokenize each word
        word = nltk.word_tokenize(pattern)
        words.extend(word)        
        #add documents in the corpus
        documents.append((word, intent['tag']))
        # add to our classes list
        if intent['tag'] not in classes:
            classes.append(intent['tag'])
print(documents)
```

Lemmatization is another method. In order to minimize all the canonical terms, we should transform terms into the form of the lemma. The terms play, play, play, play, play, etc., for example, will all be replaced with play. This way, in our vocabulary, we will reduce the number of total words. So now we have each word lemmatized and removed the redundant words.

```python
# lemmaztize and lower each word and remove duplicates
words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_letters]
words = sorted(list(set(words)))
# sort classes
classes = sorted(list(set(classes))
# documents = combination between patterns and intents
print (len(documents), "documents")
# classes = intents
print (len(classes), "classes", classes)
# words = all words, vocabulary
print (len(words), "unique lemmatized words", words)
pickle.dump(words,open('words.pkl','wb'))
pickle.dump(classes,open('classes.pkl','wb'))
```
In the end, the phrases provide the vocabulary of our project and classes include the complete individuals to categorize. We used the pickle.dump() method to save the python object into a register. After the training is completed, these files will be useful and we predict the chats.

**Step 3. Create Training and Testing Data**

We will transform each input pattern into numbers to train the model. First, each word in the pattern is lemmatized and a list of zeroes of the same length as the total number of words is generated. Only those indexes that include the word in the patterns will be set to value 1. In the same manner, by setting 1 to the class input to which the pattern belongs, we can construct the output.

```python
# create the training data
training = []
# create empty array for the output
output_empty = [0] * len(classes)
# training set, bag of words for every sentence
for doc in documents:
    # initializing bag of words
    bag = []
    # list of tokenized words for the pattern
    word_patterns = doc[0]
    # lemmatize each word - create base word, in attempt to represent related words
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    # create the bag of words array with 1, if word is found in current pattern
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)

    # output is a '0' for each tag and '1' for current tag (for each pattern)
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1
    training.append([bag, output_row])
# shuffle the features and make numpy array
random.shuffle(training)
training = np.array(training)
# create training and testing lists. X - patterns, Y - intents
train_x = list(training[:,0])
train_y = list(training[:,1])
print("Training data is created")
```
**Step 4. Training the Model**

A neural network made up of 3 dense layers will be the architecture of our model. There are 128 neurons in the first layer, 64 in the second one, and the last layer would have the same neurons as the number of classes. To minimize overfitting of the model, the dropout layers are implemented. We used the SGD optimizer to start the model training and suit the data. We then save the trained model using the Keras model.save("chatbot model.h5) "function after the training of 200 epochs is completed.

**Step 5. Interacting With the Chatbot**

Our model is ready for chatting, so let's now build a nice graphical user interface in a new file for our chatbot. The file can be called as gui chatbot.py
We will use the Tkinter module in our GUI file to construct the desktop application structure and then we will catch the user message and do some preprocessing again before we enter the message into our qualified model.
The model will then predict the tag of the user’s message, and we will randomly select the response from the list of responses in our intents file.
Here’s the full source code for the GUI file.

```python
import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import pickle
import numpy as np

from keras.models import load_model
model = load_model('chatbot_model.h5')
import json
import random
intents = json.loads(open('intents.json').read())
words = pickle.load(open('words.pkl','rb'))
classes = pickle.load(open('classes.pkl','rb'))
def clean_up_sentence(sentence):
    # tokenize the pattern - splitting words into array
    sentence_words = nltk.word_tokenize(sentence)
    # stemming every word - reducing to base form
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words
# return bag of words array: 0 or 1 for words that exist in sentence
def bag_of_words(sentence, words, show_details=True):

    # tokenizing patterns

    sentence_words = clean_up_sentence(sentence)
    # bag of words - vocabulary matrix
    bag = [0]*len(words)  
    for s in sentence_words:
        for i,word in enumerate(words):
            if word == s:
                # assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print ("found in bag: %s" % word)
    return(np.array(bag))
def predict_class(sentence):
    # filter below  threshold predictions
    p = bag_of_words(sentence, words,show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i,r] for i,r in enumerate(res) if r>ERROR_THRESHOLD]
    # sorting strength probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def getResponse(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if(i['tag']== tag):
            result = random.choice(i['responses'])
            break
    return result

#Creating tkinter GUI
import tkinter
from tkinter import *
def send():
    msg = EntryBox.get("1.0",'end-1c').strip()
    EntryBox.delete("0.0",END)
    if msg != '':
        ChatBox.config(state=NORMAL)
        ChatBox.insert(END, "You: " + msg + '\n\n')
        ChatBox.config(foreground="#446665", font=("Verdana", 12 )) 

        ints = predict_class(msg)

        res = getResponse(ints, intents)
        

        ChatBox.insert(END, "Bot: " + res + '\n\n')           

        ChatBox.config(state=DISABLED)

        ChatBox.yview(END)

root = Tk()
root.title("Chatbot")
root.geometry("400x500")
root.resizable(width=FALSE, height=FALSE)

#Create Chat window
ChatBox = Text(root, bd=0, bg="white", height="8", width="50", font="Arial",)
ChatBox.config(state=DISABLED)

#Bind scrollbar to Chat window
scrollbar = Scrollbar(root, command=ChatBox.yview, cursor="heart")

ChatBox['yscrollcommand'] = scrollbar.set

#Create Button to send message
SendButton = Button(root, font=("Verdana",12,'bold'), text="Send", width="12", height=5,
                    bd=0, bg="#f9a602", activebackground="#3c9d9b",fg='#000000',
                    command= send )
#Create the box to enter message
EntryBox = Text(root, bd=0, bg="white",width="29", height="5", font="Arial")
#EntryBox.bind("<Return>", send)

#Place all components on the screen

scrollbar.place(x=376,y=6, height=386)
ChatBox.place(x=6,y=6, height=386, width=370)
EntryBox.place(x=128, y=401, height=90, width=265)
SendButton.place(x=6, y=401, height=90)

root.mainloop()
```
**Running the Chatbot**

Now we have two separate files, one is the `train_chatbot.py`, which we will use first to train the model.

`python train_chatbot.py`
