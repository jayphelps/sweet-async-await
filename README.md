sweet-async-await
=================

Sweet.js macros to support the async/await [ES7 proposed feature](https://github.com/lukehoban/ecmascript-asyncawait) for handling [Promises](https://www.promisejs.org/)


##### Input
```javascript
async function findPosts() {
  return $.get('/posts');
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
    return Promise.cast().then(function () {
        return $.get('/posts');
    });
}

function main() {
    var ctx = this, args = arguments;
    return Promise.cast().then(function () {
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
The primary end-goal is to output the same human readable code you would use if this didn't exist, instead of using a state machine like the [traceur-compiler](https://github.com/google/traceur-compiler) does; which is far less intuitive for debugging promise chains.
