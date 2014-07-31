sweet-async-await
=================

[Sweet.js](http://sweetjs.org/) macros to support the async/await [ES7 proposed feature](https://github.com/lukehoban/ecmascript-asyncawait) for handling JavaScript [Promises](https://www.promisejs.org/)

***Probably incomplete and broken. Consider this an experiment at this point***

##### Input
```javascript
async function findPosts() {
  var response = await $.get('/posts');
  return JSON.parse(response.posts);
}

async function main() {
  console.log('starting...');
  
  var posts = await findPosts();

  posts.forEach(function (post) {
    console.log(post);
  });
  
  console.log('ending...');
}

main();
```
##### Output
```javascript
function findPosts() {
    var ctx = this, args = arguments;
    return Promise.resolve().then(function () {
        var response;
        return $.get('/posts').then(function (value) {
            response = value;
            return JSON.parse(response.posts);
        });
    });
}

function main() {
  var ctx = this, args = arguments;
  return Promise.resolve().then(function () {
    console.log('starting...');
    
    var posts;
    return findPosts().then(function (value) {
      posts = value;
      
      posts.forEach(function (post) {
        console.log(post);
      });
      
      console.log('ending...');
    });
  });
}

main();
```
### Goals
The primary end-goal is to output the same human readable code you would use if this didn't exist, instead of using a state machine like the [traceur-compiler](https://github.com/google/traceur-compiler) does; which is far less intuitive for debugging promise chains. Also, unlike traceur, there is **no runtime** library required. (unless you need to provide a Promise polyfill)
