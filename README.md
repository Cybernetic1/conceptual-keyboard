Conceptual Keyboard
===================

<img src="https://raw.github.com/Cybernetic1/conceptual-keyboard/master/octopus.png" alt="logo 1" title="Conkey"/>

The idea is to use "concepts" to type words.  For example, to type "brassiere"
you may go through the categories "physical matter" --> "clothing" --> "women" ...

Dictionaries that are organized thematically include:

1. Roget's Thesaurus (1922 version is free on Gutenberg)
2. Roget's International Thesaurus
3. Longman Lexicon of Contemporary English
4. Random House Word Menu
5. (Chinese) 同義詞詞林

We can also make use of various ontologies such as:

6. WordNet
7. YAGO
8. SUMO

Right now I'm experimenting with various categorization schemes.

Currently the Chinese dictionary "同義詞詞林" and Roget's Thesaurus are available.
The sources of dictionaries and my scripts for working with them are included in
the "dictionaries" directory.

To Run
=======

Clone the project to your directory:

    git clone https://github.com/Cybernetic1/conceptual-keyboard.git

Then run the jar file:

    java -jar dist/conkey.jar

then open either URL in your browser:

    http://localhost:9090/index.html    (for Chinese)
    http://localhost:9090/index2.html   (for English)

For NetBeans IDE
=================

Open project in NetBeans IDE (I'm using 7.3.1).

For Chinese texts, be careful to use UTF-8 encoding, or you'll see garbage.

I used java Spark as the web server, and jQuery.


A Little Grammar Theory
=========================

Notice that the program is not "usable" at this stage, as you may find it
incapable of inputting complete sentences.  That is because the thesauri do not
have entries for all word forms.

According to simple grammar theory, words are divided into 4 main classes:
nouns, verbs, adjectives, adverbs.  For example:
"肅靜" quietnesss, "靜下來" quiet down, "很靜" very quiet, "靜靜地" quietly.
These are the "main class" words.  And then there are a limited number (perhaps
hundreds) of "functional" words, such as pronouns, prepositions, conjunctions,
determiners, exclamations, etc.  Whereas there are many thousands of main class
words.  So, my future plan is, add a function that can automatically convert
between the 4 main classes (nouns, verbs, adjectives, adverbs), and then add a
a small sub-category of all functional words.  This way, we can ensure that all
word forms are available to the user.

Explanation of the GUI
========================

1. The 3 columns represent levels 1,2,3 from left to right.  Click on each
   category to see its sub-categories.
2. After choosing the levels, a list of suggested words will be displayed in
   the horizontal space.  Click on each word to send it to the Green Box.
3. The Green and Red boxes are for constructing sentences.  You can use drag-
   -and-drop.

Here's a screen shot: (English version is in the top directory)
<img src="https://raw.github.com/Cybernetic1/conceptual-keyboard/master/Screenshot_Chinese_synonym.png" alt="(screen shot)" title="Screen shot"/>

Explanation of buttons
==========================

(They are mainly for my personal use.  You probably just want to browse the
categories at this stage.)

0. Green = words you want to keep;
   Red = words to be discarded
1. Send (white): sends the White box contents to output
2. Send (green): sends the Green box contents to output
3. Up: sends White box contents to Green box
4. Down: sends Green box contents to White box
5. X (white): clear White box
6. <x : delete one Green box item from the left
7. x> : delete one Green box item from the right
8. X (green): clear Green box
9. X (red): clear Red box
10. :) : append a smiley face to the White box text
11. quotes: wrap Chinese quotation marks around White box text
12. del: if checked, the next category you click will be removed
13. ch:  if checked, replace the next category you click with the text label
         in White box
14. +: add a word to the current list of suggested words
15. +node: add a node before the currently selected category
16. "voov" and "VIP":  send messages to certain Chinese chat rooms (requires
    my own Google Chrome plugin -- not included yet)

To-Do
=======

So, this is just to give a general idea.  Feel free to contact me if you're
interested to help develop this or have suggestions!

My e-mail = generic.intelligence at Gmail

TO-DO:

1. Make user-interface prettier.
2. Abandon the use of Red, Green and White boxes, use drag-and-drop exclusively.
3. Allow app to talk to server, collect frequent words/phrases from users.
4. Intelligent sentence generation?  Perhaps one key feature is to be able to
   change the word class (or part-of-speech) of a word.
5. Use pictures or virtual reality to select words, as in a visual dictionary.
6. Your ideas / suggestions?

Philosophical Argument for the Conceptual Input Method
========================================================

For western people, they have been using phonetic spelling since Phoenician times (around 3000 years ago).  We Chinese due to our geographic isolation missed out on that development, so we're still using something akin to Egyptians' hieroglyphics.  To westerners, using phonetic spelling is second nature, so they may not want to seek alternatives to it, because the existing solution is already good enough.

For many Chinese people, typing Chinese remains a handicap probably until Google pinyin which is a quite-good solution.  It enabled me from hardly-able-to-type-Chinese to quite-fluent in a matter of days.

* * *

Less than 20 binary questions can get us down to any word in use.  The organization of those dictionaries I found typically have 10-20 categories per level.  And because (2^4)^5 = 2^20, we need only make 5 decisions max.  In practice, I think the number is around 3-4.  The last decision is to choose the target word from a small list （about 10-20 words）.

* * *

​The categorization itself may be dynamic​, ie, generated by machine learning.  For example, on each level the computer suggests a few key words that can narrow down the search, and the user picks the keyword that is closer in meaning to her target.  There need not be a unique classification of all words.

* * *

理論上， 用筆劃輸入已經過時， 因為我們表達意見時， 從「思想－>筆劃－>字詞」的轉折是多餘的，
所以拼音輸入法 必然會贏， 因為任何人都識「講嘢」。

但根據這理論， 「思想－>語音－>文字」 也有一層多餘， 似乎直接由 「思想－>文字」 還好？
但實際上， 語音 似乎已經變成了 我們思想中根深蒂固的一部分。

但，又說回來，用概念輸入， 其實所「打」的鍵數， 可能還會比 併音少 （例如，《同義詞詞林》只需
3-4 個 decisions 便可找出一字／詞）。

可能是 使用者 不熟悉 這些分類法， 所以覺得不方便？

<img src="https://raw.github.com/Cybernetic1/conceptual-keyboard/master/Cartoon_octopus.png" alt="logo 2" title="Conkey"/>
