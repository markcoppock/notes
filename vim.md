# VIM EDITOR NOTES

[docs](http://vimdoc.sourceforge.net/)  
[cheatsheet](http://tnerual.eriogerg.free.fr/vimqrc.pdf) (PDF)  
[cheatsheet](http://web.archive.org/web/20130412212112/http://www.tuxfiles.org/linuxhelp/vimcheat.html) (HTML)  
[quick reference](http://tnerual.eriogerg.free.fr/vimqrc.pdf) (PDF)

## basics

To start Vim from the shell prompt :  `vim FILENAME <ENTER>`  

**`:q <Enter>`**               to exit                                           
**`:help <Enter>`**  or  **`<F1>`**  for on-line help  
**`:w <Enter>`**  save without exiting  
`:wq` or `<shift> ZZ` to save and quit  

To exit Vim :     `<ESC>   :q!   <ENTER>`  to trash all changes.  
OR :      `<ESC>   :wq   <ENTER>`  to save the changes.  


NOTE: Pressing **`<ESC>`** will place you in Normal mode or will cancel an unwanted and partially completed command

---

## moving around

The cursor is moved using either the arrow keys or the hjkl keys

     h (left)       j (down)       k (up)       l (right)


`w` - go to next word  
`b` - go back one word  
`e` - go to the end of the current or next word  
`(` - go back a sentence  
`)` - go forward a sentence  
`{` - go back a paragraph  
`}` - go forward a paragraph  
`0` or `^` – go to the starting of the current line  
`^` – go to the first non blank character of the line  
`$` – go to the end of the current line  
`g_` – go to the last non blank character of the line  
`RETURN` - go to the beginning of the next line  
`-` - go to beginning of the previous line  

`H` – Go to the first line of current screen  
`M` – Go to the middle line of current screen  
`L` – Go to the last line of current screen  

`ctrl + g` - shows location and status of file

**You can use numbers before any movement command**  

`G` - jump to end of document  
`gg` - jump to beginning of document 

`%` - if you're on a parenthesis, brace or bracket, will move you to the opposite one   

### scrolling

without changing the position of the cursor (though stays on the screen)  

`ctrl + e` - down one 
`ctrl + y` - up one  
`ctrl + f` – Jump forward one full screen  
`ctrl + b` – Jump backwards one full screen  
`ctrl + d` – Jump forward (down) a half screen  
`ctrl + u` – Jump back (up) one half screen  

---

## inserting and deleting

### deleting

`dw` or `cw`: delete/change from the **cursor up to the next word**:     (`c` for change)  
`de` : delete to end of word 
`dw` : delete the whole word, cursor on next one   
`d$` or `D`: delete from the **cursor to the end of a line**  
`d^` : delete from the **cursor to the beginning of a line**  
`dd` : **delete a whole line** (`cc` sets you up to change the line)      
`daw` : delete one word (btw, is repeatable with the dot command)  

**That is, `d` followed by any movement command**  

`s` : Delete char under cursor and enter Insert mode  
`r` : Overwrite one char and return to Command mode   
`R` : overwrite/replace *mode*   
`x` : delete the character *at* the cursor  
`X` : delete the character *before* the cursor 

### insert or append text  
`i` :   insert before the cursor  
`a` :   insert after cursor   
**`r` : 	replace one character**   
`A` :  append after the line

### other editing

`~` : changes the case of the character at the cursor, and move the cursor forward    
`J` : joins the next line with the current line  

---

## copying and pasting

`y`  : copy (yank). Like delete (`d`) but leaves it in the file    
`yw` : yank word   
`yy` : yank line, etc.

`p`  : paste (put) the text in the buffer **after** the cursor  
`P`  : paste (put) the text in the buffer **before** the cursor   
`yyp`: copy the line and paste (creates two the same)  

Pasting does not clear the buffer. Yanking or deleting does by replacing the text in the buffer.  

---

## formatting

`>>` : indents current line  
`<<` : outdents current line  
`:se ai` : enables auto-indent  
`:se noai` : disables it  
`:se wm=8` : set wrap margin  
`:se wm=0` : disables it  

see the documentation for additional `:se` (set) commands  

---

## format for a change command

**e.g.**: `d3w` to delete three words; `y3w` to yank three words

              operator   [number]   motion

where:   
 
- operator - is what to do, such as  `d`  for delete or `c` for change (deletes then changes to insert mode)    
- [number] - is an optional count to repeat the motion  
- motion   - moves over the text to operate on, such as 
	- `w` (end of word),  
	- `b` (to beginning of word)
	- `$` (to the end of line)
	- `0` (to beginning of line), etc.
	
### undo

`u` : (lowercase u) undo previous actions          
`U` : (capital U) undo all the changes on a line  
`CTRL-r` : redo/undo the undos            

### repeating

To repeat a motion prepend it with a number:  `2w`   

`.`  repeats the last action 

---

## settings

can make changes in current instance by entering command mode (`:`), or overall in `~/.vimrc`

- for line numbering: `set nu` (to temporarily turn off, enter command mode then `set nonu`)
- for tabs: `set ts=4`
- `set background=dark`
- `syntax enable`
 
---

## finding, searching, replacing

to find (case sensitive) in the document: `/term`  (searches forward; to search backwards: `?term` ). Use regex when needed, e.g.: `/[Tt]erm` to find both Term and term    

`n` searches for the next instance  
`N` searches for the previous instance (or opposite direction if started with `?`)  

to jump to next given char in a line:	`f{char}` or `F{char}` for previous  	
then the next instance of that char:	`;`	or `,` for previous  
can then use `s` command to replace that char with multiple characters and put that action in the `.` buffer  

to start a search for the word under the cursor: `*`  
then to the next instance of that word: `n`  

(following from [tuxfiles](http://web.archive.org/web/20130412212112/http://www.tuxfiles.org/linuxhelp/vimcheat.html) accessed at [http://archive.org](http://archive.org))  

`:rs/foo/bar/a`	Substitute foo with bar. `r` determines the range and `a` determines the arguments. **Note:** the `/` can be any character, preferably one not occuring in the search and replace terms   

### the range (r) can be: 

**nothing**		Work on current line only.  
**number**		Work on the line whose number you give.  
**%**			The whole file.  

### arguments (a) can be:

`g`	Replace all occurrences in the line. Without this, Vim replaces only the first occurrences in each line.  
`i`	Ignore case for the search pattern.   
`I`	Don't ignore case.  
`c`	Confirm each substitution. You can type y to substitute this match, n to skip this match, a to substitute this and all the remaining matches ("Yes to all"), and q to quit substitution.  

[**ultimate search examples list**](http://zzapper.co.uk/vimtips.html)  

### fixing windows line breaks

#### on windows:

`:%s/^V^M/\r/g` also known as: `:%s/CTRL-V CTRL-M/\r/g`

#### on mac:

try `:set fileformat=unix` (from [stackexchange](http://stackoverflow.com/questions/811193/how-to-convert-the-m-linebreak-to-normal-linebreak-in-a-file))

---

## filtering text through shell commands

`!!<shell command>`   

e.g.,

`!!tr a-z A-Z` makes that line all uppercase; preceeding it with a numeral affects that many lines  
`!}tr a-z A-Z` applies the transformation to the paragraph  
`!}fmt` formats the paragraph  

---

## opening/editing multiple files 

in terminal, `vim <file1> <file2> ...`. Then, `:n` to edit the next file, `:N` to edit the previous, `:rew` to go to the first one  

---

## file management

`:vi!<filename>` - open another file (or, multiple files)   
`:w <newfilename>` - save a *copy* (you stay in the original file)  
`ctrl+g` — display line number and file status  
