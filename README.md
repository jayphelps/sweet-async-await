sweet-async-await
=================

Sweet.js macros to support the async/await ES7 proposed feature

https://github.com/lukehoban/ecmascript-asyncawait

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

#### Goals
The primary end-goal is to output the same human readable code you would use if this didn't exist, instead of using a state machine like the [traceur-compiler](https://github.com/google/traceur-compiler) does.
