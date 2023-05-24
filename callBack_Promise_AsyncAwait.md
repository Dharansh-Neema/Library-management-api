# Q.Explain the difference between Promises , Call back functions and Async functions

## CallBack:

JS is synchronous, the callback() can be used to make it asynchronous.

In JavaScript, functions can be passed as arguments to other functions.

Any function that is passed as an argument to another function so that it can be executed in that other function is called a callback function.

We use callback for the process and function which are dependent on each other (**interdependent**), i.e one can't happen before the previous one completed it’s execution.

> Code:

```
const first=function(){
    console.log("one");
}
const sec=function(callback)
{
    setTimeout(()=>{
        console.log("Excuted after one()")  //run after 2 sec
        callback();
    },2000)
}
const third=function()
{
    console.log("Excuted after two()");
}
first();
sec(third);
//Function third is passed as callback
//i.e. unless and untill function sec() doesn't compelete it's excution function third() won't execute.
```

### Example:

**Before placing order item should be added to cart or before clicking the submit button user should have filled the details.**

### Disadvantage of Callback :

**Callback hell, Poor way to handle errors.**

# PROMISES:

In JS promises is another way of executing asynchronous behaviour, in a more readable and manageable way.  
 It’s also help us to overcome the disadvantage of callback.

Promise generally consists of two parameter either it’s get resolved or get rejected.

Chaining of promises with .then(),.catch() makes it’s a powerful way to handle multiple asynchronous function. Through this way we get rid of callback hell.

### Example:

```
//Craeting new promises
function userInfo()
{
    return new Promise((resolve,reject)=> {
        if(true) resolve("Here is the user Info")
        else reject("Something Went wrong!!")
    })

}

//Chaining of promises
userInfo().then(()=>{
    console.log("Promise Resolved\n",userInfo())
}).catch((e)=>{
    console.log("Promise unresolved",e)
});
```

# Async/await:

**It’s a** **_syntactic sugar_**.  
Async/await helps us to write asynchronous code looks like synchronous code.

It was recently introduced (2017) and before this developers uses callback and promises to handle asynchronous code.

> • **_async_** - **It ensures that the function returns a promise, and wraps non-promises in it.**

> • **_await_** - **It makes JavaScript wait until that promise settles and returns its result.**

By using async/await, developers can write asynchronous code that is easier to read, write, and debug.

### Example

```
//Creating new promises
function userInfo()
{
    return new Promise((resolve,reject)=> {
        if(true) resolve("Here is the user Info")
        else reject("Something Went wrong!!")
    })

}

//Example using async and await
async function  example(){
    try{
    const info=await userInfo()
    console.log(info);
    }
    catch(error)
    {
        console.log(error)
    }

    }

example();  //output---> Here is the user Info

```

**_In summary, promises, callback functions, and async functions are different approaches to handle asynchronous operations._**
