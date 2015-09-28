# NodeJS + MySQL with Promises workshop
*This is our sequel to the databases and promises workshops :)*

## Basic instructions
* Fork this repository and create a new Cloud9 project by cloning your fork
* Each exercise should be done in a separate branch, **branched off of master**, with a descriptive name of your choice
* Completed exercises should be submitted as pull requests. The pull request name should be "Exercise #: " followed by the exercise's title
* All the exercises require the [`bluebird`](https://github.com/petkaantonov/bluebird/) NPM package. A **`package.json`** file is already initialized in this repo with this dependency. You'll have to do an `npm install` upon cloning in order to get all the dependencies.
* Different exercises may also require different NPM packages. This will require you to use `npm install --save` to get these packages. The `package.json` should be part of the same commit where you start using the required package(s). For example, if one of the exercises requires the use of the [`request`](https://github.com/request/request) library, then the `package.json` for that submission should contain the dependency, and it should be committed at the same time as the `exercise-#.js` that `require`s it.
* A **`boilerplate.js`** file is made available to you. It contains the base code to load and Promisify the MySQL library, make a first query, extract the rows as well as close the connection. You may keep this file in your different commits, and copy its content to get started fresh on a new exercise :)

## Exercise 1: Getting started!
1. Write a program that fetches all the databases in MySQL and prints them in a nice way on the screen.
2. Don't hesitate to use `colors` or `cli-table` or any other module of your choice to make the output nicer.

## Exercise 2: Getting more data
1. Write a program that fetches all the databases, and for each database, all the tables in that database.
2. Use the `.map` function of bluebird to end up with an array of objects `{databaseName, tableNames}`.
3. Don't hesitate to use `colors` or `cli-table` or any other module of your choice to make the output nicer.

## Exercise 3: Importing data to MySQL
For this exercise you have nothing to submit. This is going to be useful for the following exercises

1. Using the instructions from https://github.com/DecodeMTL/node-mysql-demo/blob/master/README.md, create the addressbook database, associated tables and data

## Exercise 4: Getting back our data
1. Write a program that fetches the first 10 accounts in the addressbook database
2. For each account, `console.log` a line with the account's ID and email, like this: **`#1:`**`email@domain.com`
3. Use the `colors` NPM module with the `.bold` option to achieve this effect
4. Bonus points: find a way to align the **`#XX`** part

## Exercise 5: Joining up the data 1
1. Write a program that fetches the first 10 accounts AND their address books, using the "billion queries method" from https://github.com/DecodeMTL/node-mysql-demo/blob/master/related-data.sql
2. Output one line for each account as in Exercise 4, followed by a listing of all the address book names for that account, one per line
3. Make the output look nice in any way you like

## Exercise 6: Joining up the data 2
1. Write a program that fetches the first 10 accounts AND their address books, using the "best of both worlds method" from https://github.com/DecodeMTL/node-mysql-demo/blob/master/related-data.sql
2. Output one line for each account as in Exercise 4, followed by a listing of all the address book names for that account, one per line
3. Make the output look nice in any way you like

## Exercise 7: Joining up the data 3
1. Write a program that fetches all the accounts and their address books, using a single MySQL `JOIN` query
2. `console.log` the data that you get back.
3. Notice that some fields are missing. When you did `SELECT *` in your query, MySQL output some fields that have the same names! For example:
```
*************************** 10. row ***************************
        id: 1
     email: Donec.vitae@Phasellusornare.org
  password: LUW56VCP9SK
 createdOn: 2016-05-16 12:35:09
modifiedOn: 2014-11-15 06:06:53
        id: 1052
 accountId: 1
      name: Non Hendrerit Id Inc.
 createdOn: 2014-11-10 23:49:48
modifiedOn: 2015-02-23 08:08:36
10 rows in set (0.00 sec)
```
4. This is nobody's fault: a JavaScript object can only have one property with the same name... The proper way to fix this is to point out to your `SELECT` statement each column you want to fetch, and give it an alias. For example:
```sql
SELECT Account.id AS accountId, Account.email as accountEmail, AddressBook.id as addressBookId, AddressBook.name as addressBookName --...
```
5. Fix the query, and output the list of all accounts with all their address books!

## Exercise 8: Joining up the data 4
1. Using whichever method you prefer, output a list of the first 10 accounts AND their first address book AND the first 10 entries for each address book.
2. Make the output look nice using whichever method you prefer

## Exercise 9: Pagination
1. As you know, our database currently has 1000 accounts imported into it. Displaying them all together gives for a looong output!
2. In this exercise, we're going to display the list of accounts 10 at a time, and fetch a new "page" after the user is ready
3. Using a similar process as exercise #4, list the first 10 accounts in the database
4. Using the `prompt` library, ask the user if they want to fetch the next page
5. If they say no, end the program
6. If they say yes, fetch the next page of results
7. Make sure your program detects when there are no more results, and display that to the user

## Exercise 10: Getting some data in MySQL!
1. We're going to learn about a new MySQL functionality called `LAST_INSERT_ID()`. This is rarely used directly on the command line, so that's why you haven't seen it before.
  * Basically, when you `INSERT` data in a MySQL table that has an `AUTO_INCREMENT` id field, you have no idea what the new ID will be.
  * If you're on the command line, you could perhaps just do a `SELECT * FROM Account` and look at the last row. But what happens if someone inserted a new row **just after you**, before you have the time to look again?
  * The `LAST_INSERT_ID()` function will give you the latest inserted ID *in your own connection*.
  * Let's see this for ourselves:
    1. Run `INSERT INTO Account (email,password,createdOn,modifiedOn) VALUES ("student@decodemtl.com","Hunter2","2016-05-16 12:35:09","2014-11-15 06:06:53");`
    2. Open a new terminal window, login to mysql, and run `INSERT INTO Account (email,password,createdOn,modifiedOn) VALUES ("student2@decodemtl.com","Hunter42","2016-05-16 12:35:09","2014-11-15 06:06:53");`
    3. In both windows, run `SELECT LAST_INSERT_ID()`
    4. Notice that the query will return a different ID in each case, proving to you that you can use this function even if many queries are being done at the same time
2. Using the `prompt` library, ask the user for an email, password and confirm password
3. After checking that they put the same password twice, create an account for them in MySQL
4. Output back to the user that their account was created, along with their account ID
