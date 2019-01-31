# Test Practice

## Introduction
In this project you are given a web-based application that reads RSS feeds to test all the parts.

## How to run
Open the index.html, you can check all the tests.

## All the steps in tests
### 1. Edit the allFeeds variable in app.js to make the test fail
#### I delete the 'var' statement which define the allFeeds variable, and the test shows error that allFeeds is not defined. Then I add the variable back.

### 2. add test to test each feed in allFeeds has properties name and url. And they are defined and not empty.

### 3. test the menu hidden by default:
  1) I find that hidden the menu is controlled by adding or remove a class name 'menu-hidden' in body element.
  2) While write test case, I find that $('body') return a list with one element, so to check it we use $('body')[0].classList and test whether it contains the class name or not.

### 4. test the menu functional which click.
 #### we can call element.click() to simulate the click

### 5. I have trouble when I try to test "there is at least a single .entry element within the .feed container". 
  1) I check the cheatsheet. but some of the functions are not supported by jasmine js. For example, there is no toBeEmpty() in jasmine js.
  2) I check other student's work. But it seems many student install clint side serve or 'framework' to help them to install some other packages to solve this problem.
  3) I check the doc from jasmine, I find that I could make custmermachers.
  After that, I decided to make custmermachers, to make a test just for the problem.

### 6. Write a test to test loadFeed function.
  1) get oldcontent after the first call of the loadFeed function.
  2) get newcontent after the second call of the function
  3) compare the two results. 


## Dependencies
* JQuery
* jasmine
* handlebars
* GoogleJS API

