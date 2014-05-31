sweet-async-await
=================

Sweet.js macros to support the async/await ES7 proposed feature

https://github.com/lukehoban/ecmascript-asyncawait

##### Input
```javascript
async function findPosts() {
  return $.get('/posts');
}

async function main() {
  var posts = await findPosts();
  
  posts.forEach(function (post) {
    console.log(post);
  });
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
        var posts;
        return findPosts().then(function (value) {
            posts = value;
            posts.forEach(function (post) {
                console.log(post);
            });
        });
    });
}

main();
```
### Goals
The primary end-goal is to output the same human readable code you would use if this didn't exist, instead of using a state machine like the [traceur-compiler](https://github.com/google/traceur-compiler) does; which is far less intuitive for debugging promise chains.
