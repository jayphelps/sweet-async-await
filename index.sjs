macro async {
  rule {
    function $name:ident $params { $body ... }
  } => {    
      macro await {
        rule { $expression:expr ; $after $[...] } => {
            arguments[0]($expression.then(function () {
              $after $[...]
            }));
        }
      }
      let (var) = macro {
        rule { $identifier:ident = await $expression:expr ; $after $[...] } => {
          arguments[0]($expression.then(function ($identifier) {
            $after $[...]
          }))
        }

        rule { $id } => { var $id }
      }
      
      let (=) = macro {
        rule infix { $identifier | await $expression:expr ; $after $[...] } => {
          arguments[0]($expression.then(function (value) {
            $identifier = value;
            $after $[...]
          }))
        }
        
        rule infix { $left | $right } => { $left = $right }
      }

      function $name $params {
        return new Promise(function () {
          $body ...
        }.bind(this));
      }
  }
}

export async;
