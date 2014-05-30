macro async {
  case {
    $_ function $name:ident $params { $body ... }
  } => {
    letstx $ctx = [makeIdent('ctx', #{$_})];

    return #{
      macro await {
        rule { $expression:expr ; $after $[...] } => {
            return $expression.then(function () {
              $after $[...]
            });
        }
      }
      let (var) = macro {
        rule { $identifier:ident = await $expression:expr ; $after $[...] } => {
          return $expression.then(function ($identifier) {
            $after $[...]
          })
        }

        rule { $id } => { var $id }
      }
      
      let (=) = macro {
        rule infix { $identifier | await $expression:expr ; $after $[...] } => {
          return $expression.then(function (value) {
            $identifier = value;
            $after $[...]
          })
        }
        
        rule infix { $left:expr | $right:expr } => { $left = $right }
      }
      
      macro try {
        rule { $tryBody catch $catchParams $catchBody } => {
          return new Promise(function (resolve) {
            resolve(this);
          }).then(function () $tryBody).catch(function $catchParams $catchBody);
        }
      }

      function $name $params {
        var $ctx = this;
        let (this) = macro {
          rule {} => { $ctx }
        }

        return new Promise(function (resolve) {
          resolve(this);
        }).then(function () {
          $body ...
        });
      }
    };
  }
}
