## nslookup

query Internet name servers interactively  

e.g.,

`nslookup rf.tamus.edu` yields:
	
	Server:		10.200.2.220
	Address:	10.200.2.220#53

	Non-authoritative answer:
	rf.tamus.edu	canonical name = vpr-wp.tamu.edu.
	Name:	vpr-wp.tamu.edu
	Address: 128.194.89.176

---

## OS-X: before installing things like node on the command line:

`sudo chown -R $USER /usr/local`

from [lynda.com](http://www.lynda.com/Grunt.js-tutorials/Installing-Grunt-cli-Sass/372540/385117-4.html): This recursively changes the owner of the user local folder to the current logged in user so you can run the node package manager or npm and also Ruby gems  

---

## <a name="ack"></a> ack

enhanced version of [`grep`](#grep)  

you don't need `-rn`; it automatically lists line numbers and searches recursively. e.g.: `ack ".classname" *`

e.g.,  `ifconfig | ack "10\."` shows only segments of the return value containing '10.' with those instances highlighted  

install [here](http://beyondgrep.com/install/)  

[docs](http://beyondgrep.com/documentation/)  


---

## image editing/processing

`sips -Z 1600 *.jpg` OS X only; scale jpg(s) to 1600 longest dimension. [more](http://www.maclife.com/article/columns/terminal_101_resize_images_terminal)  

### ImageMagick

[site](http://www.imagemagick.org/script/command-line-tools.php) cross platform  

### svgo

svg image optimizer [on github](https://github.com/svg/svgo)  

`svgo image.svg` or `svgo -f directory-of-svgs/`  


---

## bash editor

Ctrl-X then Ctrl-E (you may set this editor to vim in .bash_profile by adding `export EDITOR="vim"`)

---

## public key authentication

to create a private and public RSA key: `ssh-keygen -t rsa`  (for more details, and for use with github, see [here](https://help.github.com/articles/generating-ssh-keys/))

to set it up on a remote server (from [here](http://users.telenet.be/mydotcom/howto/linux/sshpasswordless.htm)):

1) secure copy (`scp`) your public key to your remote server:

`localuser@Local:~$ scp ~/.ssh/id_rsa.pub remoteuser@Remoteserver:localuser.pub.tmp`
	
2)  secure shell (`ssh`) into the remote server, copy the key into its directory, and delete the original:
	
	localuser@Local:~$ ssh remoteuser@Remoteserver  
	mkdir .ssh # (if this directory doesn't already exist)  
	chmod 700 .ssh  
	cat localuser.pub.tmp >> .ssh/authorized_keys  
	chmod 600  .ssh/authorized_keys  
	rm localuser.pub.tmp

---

## umask

`echo umask 0012 >> ~/.bash_profile` sets new files as: -rw-rw-r--

---

## rsync

"a fast, versatile, remote (and local) file-copying tool"  

from [here](http://static.afp548.com/mactips/image.html) (for OS-X):

rsync can be used to make a bootable clone. In addition to basic file copying, rsync also offers the ability to synchronize the source and target volumes &mdash; it can copy only the items that have changed, thus subsequent clones, or backups, are much faster:

`cd /Volumes/Macintosh\ HD`  
`sudo rsync -xrlptgoEv --progress --delete / /Volumes/DroboTres`

That will backup your entire main drive, deleting anything from the target that is not on the source drive (synchronizing, that is). Rsync also preserves resource forks (that's what the "E" argument is for) and **will give you a bootable backup**  

can also sync directories: `rsync -av --delete /Volumes/mac2/client-projects/ /Volumes/DroboDos/client-projects/`

[more smart copy options for OS X](http://www.456bereastreet.com/archive/201102/merging_directories_folders_on_mac_os_x/)  

---

## find 

recursively walks file structure.  `-r`/`-R` not needed (or allowed). 

Syntax:

`find . -name '*.js'`

for files modified on a certain date:

`find /path/to/dir -newermt "yyyy-mm-dd"`

`find . -mtime +60` : modified more than 60 days ago  

`find . –mtime -2` : find files modified in the last 2 days   

### find ***and remove*** all designated files in subdirectories

`find .  -name "*.pdf" -exec rm -f {} \;` **CAREFUL!!!** first do:

`find .  -name "*.pdf" -exec ls -l {} \;` to check there are no inadvertant files being deleted

### change permissions on files only:

`sudo find . -type f -exec chmod 644 {} +`

### change permissions on directories only:

`sudo find . -type d -exec chmod 755 {} +`


### copy files modified after certain date to another directory

`find . -newermt "2015-08-01" -type f  -name "backup-*" -exec cp {} ./2015-08-backups/ \;`

---

## zip 

syntax is:

`zip -r newzipname.zip directory_name/`

You can automatically unzip a file at another path into your current directory by supplying the .zip files's path:

`cd ~/.vim`  
`unzip /path/to/vimpress_x.x.x.zip`

to keep certain files out of a zip archive:

`zip -r archive.zip * -x *.git*`

### extracting a .gz file

`gzip -d test.sql.gz`

---

## tar 

to uncompress tar files:

`tar xvzf package.tar.gz` (or `tar xvjf package.tar.bz2`)  

or  
	
`tar -xzvf latest.tar.gz`

---

## regex

`^` matches beginning of line (unless it's first in square brackets; then it negates the expression)  
`*` matches zero or more characters (when used in a search term). When following a character, it indicates 0 or more of that character. E.g., `.*` specifies zero or more instances of any character  
`?` matches end of line  
`.` matches any single character  
`[...]` matches any character/range in the square brackets
`-` indicates range for chars in square brackets, or the dash char itself if it 

---

## <a name="grep"></a>grep

`grep "keywords" file(s)` 

case sensitive search

*example* `grep -r "bp_head" *`  
*example* `cat list1.txt list2.txt | grep p | sort` 

`-i` (make case insensitive)  
`-v` display those lines that do NOT match  
`-n` precede each matching line with the line number  
`-c` print only the total count of matched lines  
`-h	`- if you search more than one file at a time, the results contain the name of the file from which the string was found.  This option
turns off that feature, giving you only the lines without the file name.

see also [`ack`](#ack)  

--- 

## bash script examples

change spaces to dashes in file names in directory: 

	for i in *; do mv "$i" "`echo $i| tr ' ' '-'`"; done
	
change uppercase to lowercase in file names in directory: 

	for i in *; do mv "$i" "`echo $i| tr [A-Z] [a-z]`"; done
	
(though with both of the above you can use `rename` rather that `mv` if the OS/distribution supports it — see next)  

`cp -v * directoryname 1>../success.txt 2>../errors.txt` note: the numerals 1 and 2 correspond to the Standard Output, and the Standard Error, respectively. `... &>output.txt` combines all output.   

## bash shortcuts

from [skorks](http://www.skorks.com/2009/09/bash-shortcuts-for-maximum-productivity/)

- `Ctrl + a` – go to the start of the command line
- `Ctrl + e` – go to the end of the command line
- `Ctrl - c` - cancels (as always) the whole line
- `Ctrl + k` – delete from cursor to the end of the command line
- `Ctrl + u` – delete from cursor to the start of the command line
- `Ctrl + w` – delete from cursor to start of word (i.e. delete backwards one word)
- `Ctrl + y` – paste word or twoext that was cut using one of the deletion shortcuts (such as the one above) after the cursor
- `Ctrl + xx` – move between start of command line and current cursor position (and back again)
- `Ctrl + f` – move forward one character
- `Ctrl + b` – move backward one character
- `Ctrl + d` – delete character under the cursor
- `Ctrl + h` – delete character before the cursor
- `Ctrl + t` – swap character under cursor with the previous one

following not OS-X by default (**IN OS-X** go to iTerm -> Profiles -> Keys -> and choose "Option key acts as +Esc" to map the option [alt] key to work) 

- `Alt + b` – move backward one word (or go to start of word the cursor is currently on)
- `Alt + f` – move forward one word (or go to end of word the cursor is currently on)
- `Alt + d` – delete to end of word starting at cursor (whole word if cursor is at the beginning of word)
- `Alt + c` – capitalize to end of word starting at cursor (whole word if cursor is at the beginning of word)
- `Alt + u` – make uppercase from cursor to end of word
- `Alt + l` – make lowercase from cursor to end of word
- `Alt + t` – swap current word with previous
- `ESC - b` move one word back (must release ESC key each time)
- `ESC - f` move one word forward (must release ESC key each time)

---

## rename (Linux only)

remove spaces from filenames in current directory  
`rename -n 's/[\s]/''/g' *`

change capitals to lowercase in filenames in current directory  
`rename 'y/A-Z/a-z/' *`

### renaming files with a loop

`for f in *; do mv "$f" "$f.jpg"; done` (adds '.jpg' to each file in directory)

---

## history

displays past commands, numbered  

to redo a specific numbered command: `!468`   

to delete a specific numbered command: `history -d 468`  

CTRL-R to search history by keyword(s)  

[more](http://www.thegeekstuff.com/2008/08/15-examples-to-master-linux-command-line-history/) 

---

## sed

**strength:** character by character file and string manipulation  

see [here](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/sect_05_01.html) and [here](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/sect_05_02.html)  

Stream editing; search and replace in file while remaining in the shell. The result is sent to standard output. Results can be saved to a file using output redirection. The editor does not modify the original input.  

`sed 's/searchterm/replaceterm/g' file.txt` (use regex)  

to delete leading whitespace/tabs: `sed 's/^[ \t]*//' <filename>`  

e.g., to replace the database password "root" in a wp-config.php file to "differentpw":

`sed -i.bak "s/PASSWORD', 'root/PASSWORD', 'differentpw/g" wp-config.php` 

- use double quotes when there are single quotes in the search and replace terms
- only escape regex characters
- the `-i.bak` flag creates a backup of the original file
- for the above, could also do: `perl -pi -e "s/PASSWORD', 'root/PASSWORD', 'differentpw/g;" wp-config.php` (from [here](http://lifehacker.com/5810026/quickly-find-and-replace-text-across-multiple-documents-via-the-command-line/all); note semicolon at end of quoted statement)  

combine with `tr`: `echo "Safety & Human Factors" | tr A-Z a-z | sed 's/&/and/g' | tr [:blank:] -`; echoes `safety-and-human-factors` 


  
## ed 

find, search and replace like `sed` but you enter the program and work with the file on the command line; e.g.:  

`ed test.txt` (enters ed cli mode; then...)  

`1,$p` to view the file  

`/searchterm or regex/` to search  

`/` to repeat previous  

S&R like vim, sed but using the notation above; e.g.:  

`1,$s/^/>>/g`  to add '>>' to beginning of every line; `1,$s/\.$/!/` to change the next period at the end of a sentence to an exclamation point    

`q` to quit

## awk

**strength:** field and record level file manipulation  

from [devshed](http://forums.devshed.com/showpost.php?p=1065708&postcount=3): Set the FS to a comma, or whatever else you want to use, then deal with all the quoting headaches as patiently as possible.

	$ cat test.data
	fred,george,sarah
	marcy,wallace,larry
	
	$ awk '{print $3,$2,$1}' FS="," < test.data
	sarah george fred
	larry wallace marcy

see [separate notes file on AWK](http://dmgdemophp.tamu.edu/marknotes/awk/)  

---

## <a name="ln" id="ln"></a>ln

### symbolic link example:

`ln -s /websites/cleanairforelpaso-dev.tti.tamu.edu/wp-content/themes/cleanairforep ./ep`  **NOTE the `./`**

now just type `cd ep` (use `pwd -P` to see the full phsyical path)

---

## open / gnome-open / xdg-open

to open a file with its default application

`gnome-open file2open.pdf` (Ubuntu)  
`xdg-open file2open.pdf` (other Linux desktop environments; this and the previous one from [here](http://askubuntu.com/questions/43264/how-to-open-a-pdf-file-from-terminal))     
`open file2open.pdf`  (OS-X)   

(in Ubuntu can add `alias open='gnome-open'` to .bashrc to type the shorter OS X command)

---

## xargs

takes output of a command and passes it as argument of another command  

#### download list of URLs from a text file:

`cat url-list.txt | xargs wget –c`

#### archive all .jpg file:  

`find / -name *.jpg -type f -print | xargs tar -cvzf images.tar.gz`

#### copy all images to an external drive:  

`ls *.jpg | xargs -n1 -i cp {} /external-harddrive/directory`

---

## shopt

shell options

`shopt -s cdspell` to start spellcheck on `cd` commands

[many more](http://www.linuxnix.com/2012/08/change-shell-properties-with-linux-shopt-command.html)

---

## disk / directory usage (size)

disk usage [see here](http://www.codecoffee.com/tipsforlinux/articles/22.html)

`du -hcs .` shows size of current directory

## df 

`df -h` disk space free, see link above

---

## echo

displays arguments to the standard output

---

## ls

lists the contents of a directory (or folder).
     
`-F` distinguish folders  
`-a` show invisibles  
`-t` show by date, newest on top  
`-l` display long info   
`-r` reverse order; e.g. `ls -ltr` shows by date newest on bottom  
`-ls` adds a column showing the 512-byte blocks file uses on the disk  
`-lh` shows file/dir sizes in B, L, M, etc.

---

## tree

(when installed): shows dir and subdir contents in tree form 

---

## mkdir

makes a new directory.

---

## cd 

switches to a different directory. 

- `cd` by itself takes you to the home dir
- `cd -` to return to the previous directory

## pushd

like `cd` but pushes the current directory into a "stack", to return to with...

## popd

return to the directory/directories "stack" created with `pushd`

---

## touch

creates a new, empty file (among other uses).

## cat 

views files (among other uses, like concatenation).

---

## rm 

removes files or directories. Use with care!

	rm -rf directoryname

seriously, <span style="color:red;">**USE. WITH. CARE.**</span>

### srm

secure remove

---

## cp

copy files/directories  

ex.: `cp -pRv source/ target` (note trailing slash; copies all files/directories within, not the containing directory) 

- `-p` preserves timestamps, flags, modes, and ownerships of files
- `-R` copies the entire subtree
- `-v` makes `cp` output the name of each file that is copied

more for OS X [here](http://www.456bereastreet.com/archive/201102/merging_directories_folders_on_mac_os_x/)  

---

## pwd 

print working directory (shows where you are)

`pwd -P` shows the full, physical directory with symbolic links resolved ( see [`ln`](#ln) )

## more 

(use with the pipe char [ `|` ], which "pipes" the output of one command to another), lets you page through the output using the space bar

## less 

opens a file so you can page through with space bar; them use q to exit

to force line wrapping while in the interface, `-S`  

## head 

first 10 lines  

## tail 

last 10 lines

---

## > 

takes the output and writes/**overwrites** to the file named afterward

## >>
same as above, but appends the new output to an existing file

## < 
lets you tell a command that it should read its content from a file, rather than from the command line. e.g.: `more < data.txt` will just let you page through the file, rather than typing `cat data.txt | more`

---

## wc 
word count

---

## -h 

`--help` flags for help  

## man (command)

manual

---

## tr 

translate; e.g., changing case:
     
`echo 'UPPERCASE TEXT' | tr A-Z a-z` shows in standard output  

`echo 'UPPERCASE TEXT' | tr A-Z a-z | pbcopy` sends output to OSX clipboard    

`echo "Research Support" | tr A-Z a-z | tr [:blank:] - | pbcopy` converts string to lowercase and converts spaces to dashes  

combine with sed: `echo "Safety & Human Factors" | tr A-Z a-z | sed 's/&/and/g' | tr [:blank:] -`; echoes `safety-and-human-factors`  

show all the uppercase characters in a file as lowercase: `tr A-Z a-z < test.txt`  

change the uppercase characters in a file to lowercase characters in a new file:

`tr A-Z a-z < test.txt > test2.txt`
	
---

## curl 

to download from a URL to the current directory 

`curl -O http://www.theweathernetwork.com//common/images/web/wicons/w.gif`

---

## wget

like `curl` 

to clone a site: `wget -mk domain.com` 

from [here](http://www.maclife.com/article/columns/terminal_101_mirror_websites_offline_viewing)—

> The “-m” puts wget into mirror mode, which follows links on webpages and downloads subsequent pages on the site. The “-k” ensures that wget re-writes links so that they link to your local copy of the website instead of the original destination (the remote web server).

---

## sudo !! 

redo previous command as root user 
