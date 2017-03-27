# git notes

---

## installing

[git-scm.com](http://git-scm.com)  

for [windows](http://windows.github.com)  

see [book Pro Git ch. 1](http://progit.org/book/ch1-4.html)

also [book.git-scm.com](http://book.git-scm.com/)

---

## creating a repo
### 1. make your own
1. create new folder
2. navigate to that folder in terminal
3. `git init`
4. test with: `git status`

**OR**

### 2. git clone

**Step 1.** navigate in terminal to parent directory of where you'd like the cloned repo/working copy

**Step 2.** e.g., `git clone git://github.com/h5bp/html5-boilerplate`

- or, can clone into a new directory: `git clone git://github.com/h5bp/html5-boilerplate myhtml5b`
- or, `git clone git@git.tti.tamu.edu:wp-theme-texastaqpa.git taqpa`
	
#### to recall where the main repo was, where you first cloned from:

`git remote show origin` or `git remote -v` for less verbose display

---

## adding and committing

![working directory -> index -> repository: COMMIT](http://tticomweb.wpengine.com/wp-content/uploads/2017/03/otvx.png) from [@dcousineau](https://speakerdeck.com/u/dcousineau/p/git-an-illustrated-primer)

* check changes with `git status` and `git diff`
* w/git **there is a separate *`git add`* step before the commit** even if it's not a new file. This is to add it to the "**staging area**"
	* e.g., `git add css/style.css`
* then, after `git status`, you'll see the status prompt change from "Changes not staged for commit" (before the add) to "Changes to be committed" (after the add)
- make all the changes to files you want, but they won't be committed until they're added first
- can do `git add .` to add/stage all the files you've just revised 
- for new files, do git add **twice** (first to track, then to add to staging area)
- `git add .` adds all new files and changed files, but keeps files that you've deleted
- `git add -A` *adds everything, including deletions* Most people use `git add .` but `git add -A` can be safer (from [here](http://phpbridge.org/intro-to-php/add_the_project_to_a_git_repo?back=getting_started%23step8))
- to add AND commit in one command (i.e., to automatically stage everything): `git commit -am "adding and committing at the same command"`
	- **NOTE:** for file modifications, *not* for new files and file deletes etc. They need an additional `git add <newfile(s)>`
	- can commit individual files, just add name after: `$ git commit` *`filename`* `-m "message"`

### git diff : 
- use to show differences b/t a previous commit
	- e.g., `$ git diff b82f660775690b6fb8cabd948e1ee9c6f7e5f7b8`
	- the long number is the [SHA1][1] hash, a unique no. automatically assigned for every commit
- `git diff --staged` (just see the staged items)
- **to show (wrap) all of the lines, `-S`** while in the pager environment 
- for only showing diffs in one file: `git diff <filename>`
- for color highlighting, `git diff --color-words <filename>`


### the staging area
- a solution to the "tangled working copy problem"
- to put files in staging area for the next commit, just: `$ git add <file or directory>`

### unstaging
- use: `git reset HEAD <file>` (git displays this reminder on `git status`)

### undoing a commit: `reset`

Github article: [How to undo almost anything with git](https://github.com/blog/2019-how-to-undo-almost-anything-with-git)  

`git reset …` moves the HEAD pointer; 3 options:

1. `--soft` does not change staging index or working directory, just sets the HEAD to match the designated commit
2. `--mixed` default; changes staging index to match repo; working directory not changed
3. `--hard` **destructive;** makes staging index and working dir match the repository. It resets everything back to a commit you designate.

examples:  

- use: `git reset --hard HEAD~1` from [here](http://git-scm.com/docs/git-reset)
- e.g., the last three commits would be `HEAD`, `HEAD^` (or `HEAD~1`), and `HEAD~2` (or `HEAD^^`) (note tildes between HEAD and numerals). Can also use the SHA numbers of the commits.

#### reflog

shows everywhere the repo has been. Shows the history regardless of which branch you're on and what merges you've done. Then you can use `git reset ...`

### reverting a commit

- used to record some new commits to reverse the effect of some earlier commits 
- requires clean working tree  

`git revert HEAD~3` reverts the changes specified by the fourth last commit in HEAD and creates a new commit with the reverted changes

### amending a commit

can only amend the most recent commit (the one HEAD points to)

1. `git add` the change to be amended to the previous commit
2. `git commit --amend -m "(same message)"` 

*or*

1. `git commit --amend -m "new message"` to change the previous commit's message

### undoing changes in working directory 

`git checkout -- filename.txt` (include `--` to make sure we're not checking out a branch by that name)

### undoing a merge

`git merge --abort`


### patches
- adds parts (called "hunks") of files
- `$ git add -p` (then it gives you options on which to add)
- excellent explanation on [CSS Tricks](https://css-tricks.com/git-add-patch-mode/)

![DASH P ALL THE THINGS](http://tticomweb.wpengine.com/wp-content/uploads/2017/03/dash-p.png) 

( image from Brent Shepard's pres from [WordCamp Chicago 2014](http://wordpress.tv/2014/08/04/brent-shepherd-develop-very-mild-superpowers-with-git/): [Develop Very Mild Super Powers with Git](https://speakerdeck.com/thenbrent/develop-very-mild-super-powers-with-git) )



---

## checking and reviewing

- `git diff` (see above)
- `git status`
- `git log`
	- `git log --stat` ( list of files changed and a summary; use **"`:q`" to exit** ); or
	- `git log --stat -3` show last three commits only
	- `git log -p -1` see the diffs of the last commit
	- to search the log: `git log -g --grep="search terms"` or with [ack](https://github.com/markcoppock/notes/blob/master/cli-commands.md#-ack): `git log --oneline | ack "search terms"`
	- `git log <filename>` shows commits involving that file; add `-p` to see the diffs: `git log -p <filename>`  
	- `git log --graph`  

---

## branching and merging
- a branch is copy of the state of a repository at any commit
- see [this article](http://nvie.com/posts/a-successful-git-branching-model/ "A successful Git branching model")
- and @dousineau's [slides](https://speakerdeck.com/u/dcousineau/p/git-an-illustrated-primer)

### to see available branches:
`git branch`

### to switch to another existing branch:
`git checkout master`

### to create a branch
`git checkout -b mark-css` which is shorthand for:

- `git branch mark-css`
- `git checkout mark-css`

### to delete a branch
`git branch -d nav-css`

### to delete branch from github
`git push origin --delete branchname`

### to merge a branch with the current one
`git merge branchname`

#### to undo that merge:

`git merge --abort`

### put the branch name in your command prompt

from [better-explained](http://betterexplained.com/articles/aha-moments-when-learning-git/); like: `m-coppock@tti-mbp:stfe(utilitynav)$`

in your ~/.bash_profile ( must be **before** the line beginning with `export PS1=...` ): 

	parse_git_branch() {
    	git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
	}

then, near the end of the line beginning with `export PS1=...`, add this  before the `$`: 

	$(parse_git_branch) 
	
e.g., 

	export PS1="\[\033[36m\]\u\[\033[m\]@\[\033[32m\]\h:\[\033[33;1m\]\W\[\033[m\]\$(parse_git_branch)$ "

---

<a name="tag" id="tag"></a>   

## tagging

[the basics](https://git-scm.com/book/en/v2/Git-Basics-Tagging)  

to establish "official" releases / version numbers. Can be used for [auto-updating WordPress themes and plugins](http://www.disruptiveconversations.com/2012/02/how-to-auto-update-wordpress-custom-themes-using-github.html)  
 See the [Semantic Versioning document](http://semver.org/) (though not of course with private repos or enterprise Github installs like github.tamu.edu)   

to create a tag: `git tag v0.1.0`   

with annotation: `git tag -a v1.4 -m 'my version 1.4'`  

to show previous tags: `git tag`  

to push to origin (*separate* from pushing branches): `git push origin v0.1.0`  

pushing multiple tags at once: `git push origin --tags`   

pulling tags: `git pull origin --tags`  

### notes for using with WP themes/plugins

**IMPORTANT:**  

- keep the tag and the style.css / pluginname.php version number ***in sync***
- **push the changes with version number first, then the tag**

---

## git stash

### stashing work temporarily

`git stash save "work in progress for foo feature"`

### after editing/merging/whatever

`git stash apply`

---

## .gitignore

e.g., 

	.DS_Store
	*.zip
	*.gz
	log/*.log
	log/*.log.[0-9]

add the .gitignore file to git just like any other file

---

## git push
1. first add 
2. then, commit  (see above)
3. ***then*** push
	- `git push [alias] [branch]`
	- to gitlab; e.g.: **`git push origin footer`**

---

## git pull

retrieves a branch from github/gitlab and merges it with your current branch (combines `git fetch` and `git merge` without letting you see what will happen beforehand)

- `git pull git@git.tti.tamu:wp-theme-osrs.git master`
- or, `git pull origin master`

[differences between `git pull` and `git fetch`](http://stackoverflow.com/questions/292357/whats-the-difference-between-git-pull-and-git-fetch#answer-15733096)


### git rebase

[see here](http://notes.envato.com/developers/rebasing-merge-commits-in-git/); and comments 

---

## removing files

### removing files untracked by git:

`git clean -fd`   

- careful; it'll nuke .gitignore too
- [from objectliteral](http://objectliteral.blogspot.com/2011/03/remove-files-untracked-by-git.html)

### removing tracked files:

`git rm filename`  
`git rm -rf directoryname`

### to remove from git but not delete the file/directory:

`git rm --cached filename`  
`git rm --cached -r directoryname`  


---

## show files tracked by git

`git ls-tree --full-tree -r HEAD`  

---

## submodules

like repos within repos  

`subtree` 

### deleting a submodule 

if you find you inadvertantly have a submodule in your repo:

`git rm --cached lib/metaboxes` ( `lib/metaboxes` contained the submodule [another repo] )  

if you get an error like: `fatal: pathspec 'lib/metaboxes/' did not match any files`; remove the trailing slash

---

<a name="forking" id="forking"></a>
## forking (github)

- fork the repo with the supplied link
- clone the forked repo to your local install
- to allow the forked clone to update with the original: `git remote add upstream <originalrepoaddress>` (from [here](https://help.github.com/articles/fork-a-repo/); check with `git remote -v`)
- to sync with the original repo (from [here](https://help.github.com/articles/syncing-a-fork/)):
	-  `git fetch upstream`
	-  `git checkout master`
	-  `git merge upstream/master`
	-  if you like, push your changes to your forked repo  

---

## config

`~/.gitconfig`  

### sample contents

	[user]
	name = Sam Spade
	email = sam@spadeandarcher.com

	[alias]
	st = status
	ci = commit
	co = checkout
	br = branch
	ol = log --pretty=oneline
	la = log --pretty=\"format:%ad %h (%an): %s\" --date=short
	
(last two from [better-explained](http://betterexplained.com/articles/aha-moments-when-learning-git/))  

and…from [bash-it](https://github.com/revans/bash-it/blob/master/aliases/available/git.aliases.bash)

---

## permissions issues with repos and the .git directory

when multiple developers are working in the same repo (dev server e.g.):  

`chmod -R g+swX .` (entire directory, recursive)  

`chmod -R g+swX .git` (the .git directory)  

---

## auto completion

from [lynda.com](http://www.lynda.com/Git-tutorials/Using-Git-help/100222/111258-4.html)  

(Already included in GitBash for Windows)  

in your home directory:

`curl -OL https://github.com/git/git/raw/master/contrib/completion/git-completion.bash`

`mv git-completion.bash .git-completion.bash` 

in ~/.bash_profile:

	if [ -f ~/.git-completion.bash ]; then
		source ~/.git-completion.bash
	fi

---

# from other online sources

from [a list apart](http://www.alistapart.com/articles/get-started-with-git/):


* Git is really a *change* tracker rather than a version tracker

* [O'Reilly video](http://video.linux.com/videos/oreilly-webcast-git-in-one-hour "Git in One Hour")

* [Pro Git online creative commons book](http://progit.org/book/)



![File Status Lifecycle](http://git-scm.com/figures/18333fig0201-tn.png)



---

[1]: http://en.wikipedia.org/wiki/SHA-1 "Secure Hash Algorithm"

  
