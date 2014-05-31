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

## Demo
[Work-in-progress live demo](http://sweetjs.org/browser/editor.html#/**%0A%20*%20async%20macro%20setup%0A%20*%20SCROLL%20TO%20THE%20BOTTOM%20FOR%20THE%20EXAMPLE!%0A%20*******************************************************************************%0A%20*/%0A%20%0Amacro%20async%20%7B%0A%20%20case%20%7B%0A%20%20%20%20$_%20function%20$name:ident%20$params%20%7B%20$body%20...%20%7D%0A%20%20%7D%20=%3E%20%7B%0A%20%20%20%20letstx%20$ctx%20=%20%5BmakeIdent('ctx',%20#%7B$_%7D)%5D;%0A%0A%20%20%20%20return%20#%7B%0A%20%20%20%20%20%20function%20$name%20$params%20%7B%0A%20%20%20%20%20%20%20%20macro%20try%20%7B%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20rule%20%7B%20$tryBody%20catch%20$catchParams%20$catchBody%20finally%20$finallyBody%20%7D%20=%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20Promise.cast()%0A%20%20%20%20%20%20%20%20%20%20%20%20.then(function%20()%20$tryBody)%0A%20%20%20%20%20%20%20%20%20%20%20%20.catch(function%20$catchParams%20$catchBody)%0A%20%20%20%20%20%20%20%20%20%20%20%20.finally(function%20()%20$finallyBody);%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20rule%20%7B%20$tryBody%20catch%20$catchParams%20$catchBody%20%7D%20=%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20Promise.cast()%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20.then(function%20()%20$tryBody).catch(function%20$catchParams%20$catchBody);%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20let%20(await)%20=%20macro%20%7B%0A%20%20%20%20%20%20%20%20%20%20rule%20%7B%20$expression:expr%20;%20$after%20$%5B...%5D%20%7D%20=%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20$expression.then(function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20$after%20$%5B...%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D);%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20let%20(var)%20=%20macro%20%7B%0A%20%20%20%20%20%20%20%20%20%20rule%20%7B%20$identifier:ident%20=%20await%20$expression:expr%20$after%20$%5B...%5D%20%7D%20=%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20$identifier;%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20$expression.then(function%20(value)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20$identifier%20=%20value%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20$after%20$%5B...%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D)%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20rule%20%7B%20$id%20%7D%20=%3E%20%7B%20var%20$id%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20let%20(=)%20=%20macro%20%7B%0A%20%20%20%20%20%20%20%20%20%20rule%20infix%20%7B%20$identifier%20%7C%20await%20$expression:expr%20$after%20$%5B...%5D%20%7D%20=%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20$expression.then(function%20(value)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20$identifier%20=%20value%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20$after%20$%5B...%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D)%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20rule%20infix%20%7B%20$left:expr%20%7C%20$right:expr%20%7D%20=%3E%20%7B%20$left%20=%20$right%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20var%20$ctx%20=%20this;%0A%20%20%20%20%20%20%20%20let%20(this)%20=%20macro%20%7B%0A%20%20%20%20%20%20%20%20%20%20rule%20%7B%7D%20=%3E%20%7B%20$ctx%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20return%20Promise.cast()%0A%20%20%20%20%20%20%20%20%20%20.then(function%20()%20%7B%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20$body%20...%0A%20%20%20%20%20%20%20%20%20%20%7D);%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D;%0A%20%20%7D%0A%7D%0A%0A/**%0A%20*%20Example%0A%20*******************************************************************************%0A%20*/%0A%20%0Afunction%20fakeAjax()%20%7B%0A%20%20return%20new%20Promise(function%20(resolve)%20%7B%0A%20%20%20%20setTimeout(function%20()%20%7B%0A%20%20%20%20%20%20resolve(%5B%7B%20id:%201,%20body:%20'First%20comment'%20%7D%5D);%0A%20%20%20%20%7D,%202000);%0A%20%20%7D);%20%0A%7D%0A%0Afunction%20Post(id)%20%7B%0A%20%20this.id%20=%20id;%0A%20%20this.comments%20=%20null;%0A%20%20this._commentsP%20=%20null;%0A%7D%0A%0APost.prototype._fetchComments%20=%20async%20function%20_fetchComments()%20%7B%0A%20%20var%20comments%20=%20await%20fakeAjax(this.id);%0A%20%20%20%20comments%5B0%5D.body%20+=%20'%20of%20the%20day';%0A%20%20%20%20return%20comments;%0A%7D;%0A%0APost.prototype.getComments%20=%20async%20function%20getComments()%20%7B%0A%20%20if%20(this._commentsP%20===%20null)%20%7B%0A%20%20%20%20this._commentsP%20=%20this._fetchComments();%20%20%0A%20%20%7D%0A%20%20%20%20%0A%20%20return%20this._commentsP;%0A%7D;%0A%0Aasync%20function%20main()%20%7B%0A%20%20var%20post%20=%20new%20Post(123);%0A%0A%20%20//%20Comments%20may%20or%20may%20not%20be%20loaded%20yet%0A%20%20var%20comments%20=%20await%20post.getComments();%0A%0A%20%20console.log('comment:%20',%20comments%5B0%5D.body);%0A%7D)
