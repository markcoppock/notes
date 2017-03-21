# AWK

from [lynda.com](http://www.lynda.com/Linux-tutorials/AWK-Essential-Training/162719-2.html)  

## manual

at [gnu.org](http://www.gnu.org/software/gawk/manual/gawk.html)  

## for text files

for working with data from Excel, export as text

## records

AWK sees each line in the file as a separate record. Within each record may be multiple fields (i.e., items separated by space(s) and/or tabs) 

### identifying fields

each field denoted by: `$1`, `$2`, `$3`, etc.  

#### special field: `$0`

`$0` indicates the entire record (entire line)  

---

## working with commands

each AWK command consists of one or more statements, each consisting of:

- a pattern; and/or
- an action (the part enclosed in the curly braces)

### regex

slashes indicate a regular expression

	awk '/up/{print $0}' dukeofyork.txt

print only lines containing 'up'

### built-in variables

`NF`: number of fields   
`NR`: number of records

e.g.,

	awk 'NF==6{print $0}' dukeofyork.txt

prints lines with exactly 6 fields, In this case, can leave out the action since it's the default action: `awk 'NF==6' dukeofyork.txt` does the same thing.  

Can program multiple pattern/action statements in the same program:  

	awk '/up/{print "UP:", $0} /down/{print "DOWN:", $0}' dukeofyork.txt

prints lines containing either "up" or "down"; preceding the line with which one. *Note*: lines containing both will be printed twice.  

---

---

---

## flags

### `-f`

use the following file as the program; e.g., if the contents of the file "swap" is `{print $2, $1}`,

	awk -f swap names.txt

### `-F`

change the default field separator (which is a space). e.g., if our data is comma separated, 

	awk -F , '{print $2}' commas.txt

or, tab separated:

	awk -F t '{print $2}' tabs.txt

now, white space(s) and/or tabs are considered part of the field.  

Note that the field separator specified can be any regular expression

	awk -F '[,!]' '{print $2}'

### `-v`

establish a variable. e.g.,

	awk -v hi=HELLO '{print $1, hi}' test.txt

prints " HELLO" after the first field of each line

---

---

---

## specifying input and output

### specify multiple input files

	awk '{print $2 $1}' names.txt morenames.txt

### standard input 

rather than (a) file(s):

	awk '{print NF, $0}'

then type records and receive output

### input the output of a command

	uptime | awk '{print NF, $0}'

### redirect output to a file

	awk '{print NF, $0}' dukeofyork.txt > awk.out

### pipe output to a command
	
	awk '{print NF, $0}' dukeofyork.txt | sort -n

---

---

---

## commands

### `print`

from a file with firstname lastname (firstfield secondfield)  on separate lines: 

	awk '{print $2, $1}' names.txt 

outputs:

	Citizen Joe
	Doe John
	
etc.  

to output each name as lastname firstname. 

The `,` inserts a field separator (by default, a single space). **note**: the original file is unchanged.  

Without a space, the `print` command **concatenates**:

	awk '{print $2 $1}' names.txt 

outputs:

	CitizenJoe
	DoeJohn

to specifically add a comma and space between the fields (note double quotes):

	awk '{print $2 ", " $1}' names.txt 

outputs:

	Citizen, Joe
	Doe, John
	
---

### the `BEGIN` special pattern

`FS`: field separator  
`RS`: record separator  
`OFS`: output field separator   
`ORS`: output record separator

AWK divides the input into records and fields ***before*** calling each action, so this will result in an error on the first line: `awk '{FS=","; print $2}'`

To avoid that, use `BEGIN`: 

	awk 'BEGIN{FS=","} {print $2}'
	
---

### more built-in variables

`FILENAME`   
`FNR` number of records in that file  

### assigning new values

	awk '{$2="TWO"; print}' dukeofyork.txt
	
replaces the second field in each line with the assigned new value
 
#### `NR` increments when multiple files called

awk concatenates multiple files when called  

e.g., `awk '{print NR, $0}' dukeofyork.txt names.txt` displays 27 total records (8 from first file, remaining from second)  

e.g., `awk '{print FILENAME, FNR, $0}' dukeofyork.txt names.txt` 

---

### creating user-assigned variables

- case-sensitive  
- are treated as numbers or strings, as necessary, depending on context
- integer and floating-point values (6 digits default) convered to one another as necessary
- arithmetic operators have priority over concatenation
- concatenate with a string to ensure a variable is treated as a string

#### user var scope: GLOBAL SCOPE

---

### operators

#### math operators 

include `%` (modulo) and `^` (to the power of)  

#### increment/decrement operators

e.g.,

	awk '{a=3; b=++a; print a, b}'
	
yields `4 4`  

	awk '{a=3; b=a++; print a, b}'
	
yields `4 3`   

#### assignment operators

include `*=`, `%=`, `^=`  

#### comparison operators

as usual

##### regex expression comparison

`~`, `!~`

---

### arrays

assign with `[]`; e.g., `awk '{a[1]=$1}'`

supports one-dimensional arrays only  

#### associative arrays

	awk '{a["first"]=$1; a["second"]=$2; a["third"]=$3; print a["third"], a["second"], a["first"]}'
	
to iterate, use a `for ... in` statement:

	awk '{a["first"]=$1; a["second"]=$2; a["third"]=$3; for (i in a) { print i, a[i]  } }'
	
**note**: will not be in a predictable order, so you can pipe to the `sort` command  

#### faking multidimensional arrays

---

### math functions

`int(x)`  

`rand()`  

`sqrt()`  

`sin()`, `cos()`, `tan()`, etc.  

---

---

---

## regex

indicated in awk with forward slashes  

- always case sensitive
- `/abc/` matches "abc", "xxabcxx"
- e.g. `awk '/up/{print "UP: " $0}'` prints records containing "up"
- `awk '$4 ~ /up/{print}' dukeofyork.txt` prints lines with the fourth field matching "up" (*note regex comparison expression `~`*)

### metacharacters

`.` matches any single character; e.g., `/a.c/` matches "aXc" etc., *not* "ac" or "aXYZc"  

`\` escapes special meaning. `/a\.c/` matches "a.c"  

`^` and `$` matches beginning and end of fields, respectively (fields, *not lines* [as with grep])  

`[]` defines a **character class**. It matches any single character in the set. 

E.g.: 

`/a[xyz]c/` matches "axc", not "axyzc"  
`[a-z]` matches any lower case alpha character a-z. Also, `[0-9]` numerals, `[A-Z]` uppercase, `[a-zA-Z]` any alpha character

`[^]` specifies anything **not** defined by the character class; e.g., `[^a-z]` defines anything *other than* a lower case alpha char.

#### quantifiers—apply to the *immediately preceding* item  

an "item" is usually:

- a character
- a period
- a character class
- a group (indicated by parentheses)

`*` matches **zero or more** occurences of the previous item  

`+` matches **one or more** occurrences

`?` matches zero **or** one occurrences  

`{}` specifies an exact number of occurrences: `/ab{3}c/` matches "abbbc"  

`{n,}` n or more occurrences  

`{n,m}` n to m occurrences  

regex is *greedy*; i.e., will match as many characters as it can  

---

## control structures

`if` statements  

`for` statements/loops  

---

## formatting output

**<code>printf( <em>format, value(s)</em> )</code>**

### format specifiers

`%s` the corresponding value should be output as a string   
`%d` the corresponding value should be output as a decimal integer value    
`%f` floating point value 

e.g.:

	awk -F , '{printf("%s\t%s\t%d\n", $1, $2, $3)}' nameemailavg.csv
	
### width and precision specifiers

	awk -F , '{printf("%-20s %-35s %6.2f\n", $1, $2, $3)}' nameemailavg.csv
	
- in the above: `%-20s` and `%-35` specify "pad to 20 and 35 characters, respectively
- the `-` left justifies 
- the `6.2f` creates a six-digit (max) floating point number with a precision of 2 decimal places
- using these specifiers negates the the for tabs between columns 

---

## string functions

`length( [string] )`  

`index( string, target )` 
 
`match( string, regexp )` sets variables `RSTART` and `RLENGTH`   

`substr( string, start[, length] )`  

`sub( regex, newval [, string] )` matches first occurrence

`gsub( regex, newval [, string] )` matches globally  

`split( string, array [, regex] )`

strings are **1 based**; in string "Snoopy", "S" is char 1 (not 0)   

string regex is *greedy*; will find as many as possible; e.g., `match("antidisestablishmentarianism", /b[a-z]*n/)` matches "blishmentarian" (didn't stop at first "n")  

---

## combining with other tools



---

---

---

## applications

for a file of addresses separated by blank lines:

	awk 'BEGIN{RS="";FS="\n"} {name=$1;address=$2;citystatezip=$3; print name ", " address ", " citystatezip}' multiaddress.txt

to print only the 6th line:

	awk 'NR==6{print NR, $0}' dukeofyork.txt

to print the next to last field on each line:

	awk '{print $(NF-1)}' dukeofyork.txt

Putting the dollar sign in front of anything that has a numeric value, yields the value of the field whose number is the value of that variable. Use parenthesis as above, since without them **the numeric value of a word is 0**.    

### html

`/<.+>/` matches all of "\<i>italic text\</i>"  

`/<[^>]+>/` matches only the "\<i>" of the above  

### fantastic awk 1-line scripts

from [pement.org](http://pement.org/awk/awk1line.txt)  