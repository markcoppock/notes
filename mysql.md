**Date:** 2013-05-13 12:00  
**Title:** MySQL notes

---

## setting up a new WP database from [ubuntu server guide](http://ubuntuserverguide.com/2012/05/how-to-install-latest-wordpress-in-ubuntu-server-12-04-lts.html)

can use phpmyadmin, or...

1. `mysql -u root -p`
2. `CREATE DATABASE dbsitename;` 
3. `CREATE USER sitenameuser;` (not using root)
4. `SET PASSWORD FOR sitenameuser = PASSWORD("sitenamepassword");` 
5. `GRANT ALL PRIVILEGES ON dbsitename.* TO sitenameuser@localhost IDENTIFIED BY "sitenamepassword";`
6. `FLUSH PRIVILEGES;` 
7. `exit`

can check wp-config.php later if needed for database name, user and password  

<span style="color:red;">**>>>> NOTE >>>>**</span>: there is a [<span style="color:red;">**16-character length limit**</span>](http://dev.mysql.com/doc/refman/5.6/en/user-names.html) on MySQL usernames.   

---

## generic mysql notes from [lynda.com](http://www.lynda.com/MySQL-tutorials/PHP-MySQL-Essential-Training/119003-2.html)

### CRUD

- create
- read 
- update
- delete

### commands not listed above

- `mysql -u username -p db_name` (to log in)
- `SHOW DATABASES;`
- `DROP DATABASE db_name;`
- `USE db_name;`
- `SHOW GRANTS FOR 'db_user'@'localhost';`

### creating and working with tables 

	CREATE TABLE table_name (
	 column_name1 definition,
	 column_name2 definition,
	 column_name3 definition,
	 options
	);

example:  

	CREATE TABLE subjects (
     id INT(11) NOT NULL AUTO_INCREMENT,
     menu_name VARCHAR(32) NOT NULL,
     position INT(3) NOT NULL,
     visible TINYINT(1) NOT NULL,
     PRIMARY KEY (id)
    );

#### from the above example:

- for the first column above (`id`), *always enter as shown*  
- `VARCHAR` is MySQL for string
- `TINYINT(1)` is MySQL for boolean
- the numerals in parenthesis indicate size in number of digits or characters (e.g., `INT(3)` goes to 999)
- enter the last column to indicate the primary key (how mysql should identify each row)

#### additional commands

- `SHOW TABLES;`
- `SHOW COLUMNS FROM table_name;`
- `DROP TABLE table_name;`

#### list of commands

[good command list at **thegeekstuff.com**](http://www.thegeekstuff.com/2013/09/mysql-select-command/)


---

### CRUD: *create*

	INSERT INTO tablename (column1, column2, column3)
	VALUES (val1, val2, val3);

### CRUD: *read*

example: 

	SELECT *
	FROM tablename
	WHERE column1 = 'some_text'
	ORDER BY column1 ASC;

explained:

1. `SELECT * <space>` select all columns; could specify a comma-delimited list of certain column names. A SPACE BETWEEN THIS AND THE WORD 'FROM' IS REQUIRED
2. `FROM tablename ` can just stop here to read all columns
3. `WHERE column1 = 'some_text'` (optional) show only rows meeting this criterion (note single `=`, unlike PHP)
4. `ORDER BY column1 ASC;` (optional) in this case, ascending

### CRUD: *update*

	UPDATE tablename 
	SET column1 = 'some_text' 
	WHERE id = 1;

In this example, sets value for first row only. 

### CRUD: *delete*

	DELETE FROM tablename 
	WHERE id = 1;

deletes specified row

---

### populating the database

#### adding and working with rows in a table:

	INSERT INTO subjects (menu_name, position, visible)
    -> VALUES ('About Widget Corp', 1, 1);

	INSERT INTO subjects (menu_name, position, visible) VALUES ('Products', 2, 1);

	INSERT INTO subjects (menu_name, position, visible) VALUES ('Services', 3, 1);

(etc.)

viewing the new rows: `SELECT * FROM subjects;`  

accidentally entered the same row twice? `DELETE FROM subjects WHERE id = 3;`  

viewing a portion of the table based on one criterion: `SELECT * FROM subjects WHERE visible = 0;`  

ordering the results: `SELECT * FROM subjects WHERE visible = 1 ORDER BY position ASC;`  

view a single row: `SELECT * FROM subjects WHERE id = 4;`  

changing a field in a row: `UPDATE subjects  SET visible = 1 WHERE id=5;`   

changing all of a column: `UPDATE subjects SET visible = 0;`  

changing a select parts of a column: `UPDATE subjects SET visible = 1 WHERE id < 4;`  

### relational database

in a different table, create a new table with a 'foreign key' column, which connects this table with (a) row(s) from another  

**specify an index** to indicate which column which are to be used as foreign keys:

	CREATE TABLE pages (
     id INT(11) NOT NULL AUTO_INCREMENT,
     subject_id INT(11) NOT NULL,
     menu_name VARCHAR(30) NOT NULL,
     position INT(3) NOT NULL,
     visible TINYINT(1) NOT NULL,
     content TEXT,
     PRIMARY KEY (id),
     INDEX (subject_id)
    );

![creating a new table with a 'foreign key' column, which connects this table with (a) row(s) from another](https://dl.dropboxusercontent.com/u/2561535/Screenshots/relational_db_tables.png)

---

### php and mysql apis

![PHP database apis: mysql, mysql1, PDO](https://dl.dropboxusercontent.com/u/2561535/Screenshots/php-db-apis.png)  

also [php.net](http://php.net/en/mysqlinfo.api.choosing.php) for choosing  

#### interaction steps

1. create a connection ( `mysql1_connect()`, `mysqli_connect_errno()`, `mysqli_error()` )
2. perform a query ( `mysqli_query()` )
3. use returned data, if any 
	- `mysqli_fetch_row()` results are in a standard array, keys are integers
	- `mysqli_fetch_assoc()` results are in an associative array, *keys are column names* (ordinarily, use this)
	- `mysqli_fetch_array()` this last one can be passed `MYSQL_NUM`, `MYSQL_ASSOC`, `MYSQL_BOTH`, since it can pass results in either or both ways
4. release returned data ( `mysqli_free_result()` )
5. close the connection ( `mysqli_close()` )

##### 1. create a connection

	$dbhost = "localhost";
	$dbuser = "widget_user";
	$dbpass = "widgetpw";
	$dbname = "widget_corp";
	$db = mysqli_connect( $dbhost, $dbuser, $dbpass, $dbname ); // $connection is now termed the 'handle'

##### 2. perform a query

when done in concatenated steps like this, it's called "assembling a query"  

	$query = "SELECT * ";
	$query .= "FROM subjects " ; // note necessary spaces to separate words
	$query .= "WHERE visible = 1 ";
	$query .= "ORDER BY position ASC";

	$result = mysqli_query( $db, $query ); // the variable created here is a special kind of object called a 'resource', which is a collection of database rows

or, **for inserting a row:**

	$query  = "INSERT INTO subjects (";
	$query .= " menu_name, position, visible";
	$query .= ") VALUES (";
	$query .= " '{$menu_name}', {$position}, {$visible}";
	$query .= ")";

	$result = mysqli_query( $db, $query ); // true or false

to have the id returned: `$id = mysqli_insert_id($db);`

**for updating:**

	$query  = "UPDATE subjects SET ";
	$query .= "menu_name = '{$menu_name}', ";
	$query .= "position = {$position}, ";
	$query .= "visible = {$visible} ";
	$query .= "WHERE id = {$id}";

	$result = mysqli_query( $db, $query ); 

when updating, must check for success not as a boolean but:  

`if ( $result && mysqli_affected_rows($db) == 1) { ...` (or however many expected)  

**for deleting**

	$query  = "DELETE FROM subjects ";
	$query .= "WHERE id = {$id} ";
	$query .= "LIMIT 1"; // always use when deleting

	$result = mysqli_query( $db, $query );

	if ( $result && mysqli_affected_rows($db) == 1) { 
		echo "Success";
	} else {
		die( "Database query failed. " . mysqli_error($db) );
	}

##### 3. use returned data (if any)

for the READ part of CRUD  

	<ul>
		<?php while ($row = mysqli_fetch_assoc($result)) {  ?>
		<li>
		<?php echo $row["menu_name"]; ?>
		</li>
	<?php } ?>
	</ul>

##### 4. release the returned data

also for the READ part  

	mysqli_free_result($result); 

##### 5. close connection

	mysqli_close($db);

--- 

### guarding against SQL injection

e.g., a malicious user entering `'); DROP TABLE subjects; '` in a form field/URL string/cookie that we'll be trying to update our table with  

#### escaping strings

single quotes the bane. Manually, escaped with `\'`  

##### PHP history

- `addslashes($string)` function   
- **magic quotes** (automatically running `addslashes()` **removed in PHP 5.4**)

##### BETTER

USE `mysqli_real_escape_string($dbconnection, $string)` ONCE FOR ALL STRINGS  

##### BEST—prepared statements

set up a template for a query that will be run numerous times, using `?` for each place data will go.   

e.g.,

	INSERT INTO subjects (
		menu_name, position, visible
	) VALUES (
		?, ?, ?
	)

Then, bind the placeholder to their variables:

![example](http://tticomweb.wpengine.com/wp-content/uploads/2017/03/mysqli-prepared-statement-example.png)

prepared statements ***separate the query from the dynamic data, eliminating the possibility of SQL injection*** (also eliminates the need to escape strings)  

---

### refactoring

revising existing code to change its structure or appearance, but *without* changing its behavior. **Improving** the code.  

for the sake of:

- simplicity
- clarity
- maintainability
- efficiency
- flexibility
	- reusability
	- extensibility

e.g., here's the original code:

	$query = "SELECT * ";
	$query .= "FROM subjects " ;
	$query .= "WHERE visible = 1 ";
	$query .= "ORDER BY position ASC";
	$subject_set = mysqli_query( $db, $query );
	if ( ! $subject_set ) {
		die( "Database query failed." );
	}

**refactored:**

*original file:*

	$subject_set = find_all_subjects();

*functions.php file:*

	function confirm_query( $result_set ) {
		if ( ! $result_set ) {
			die( "Database query failed." );
		}
	}

	function find_all_subjects() {
		global $db; // the connection

		$query = "SELECT * ";
		$query .= "FROM subjects " ;
		$query .= "WHERE visible = 1 ";
		$query .= "ORDER BY position ASC";
		$subject_set = mysqli_query( $db, $query ); 
		confirm_query( $subject_set );

		return $subject_set;
	}
