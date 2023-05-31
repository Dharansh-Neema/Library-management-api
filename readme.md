# Library Management System API's

## The overview of routes can be seen in this Mind Map:

    ![alt text](https://github.com/Dharansh-Neema/Library-management-api/blob/main/images/mindmap.png)

## To start the application

> run:
> `node index.js`

## The signup route

> Open postman and enter the following url:

[a link](http://localhost:8080/api/signup)  
And send a Post request

Give Name,Email and password like this  
![alt text](https://github.com/Dharansh-Neema/Library-management-api/blob/main/images/signupExample.png)

### Output will be like:

![alt text](https://github.com/Dharansh-Neema/Library-management-api/blob/main/images/SignupOut.png)

## Similary for Login route

[a link](http://localhost:8080/api/login)

### Give Email and password in json format it will give you the info of user and token and stroe cookie for furture session

## Global routes

### To see all books

Use this route

[a link](http://localhost:8080/api/allBooks)  
It will give you the name of all books in the Library

## User Route

> This route is for users and in the database their Role is stored as user.

### Issue a book

Use following routes:
[a link](http://localhost:8080/api/issue)
Give name of the book in json format

## Admin Routes

> This route is only for Admin and in the Database their Role is stored as admin  
> CRUD of Admin are:

### Add Books

> This route is to add Books
> [a link](http://localhost:8080/api/admin/book/add)  
>  Provide Name of the book, Author of the book and stock of the book

### Update Books

> This route is to Update Books
> [a link](http://localhost:8080/api/admin/book/update)

Provide id of the book,And new info such as name and Author of the book

### Delete Books

> This route is to delete books
> [a link](http://localhost:8080/api/admin/book/delete)
> Provide the id of the book which has to be deleted
