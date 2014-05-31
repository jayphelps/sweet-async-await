macro async {
  case {
    $_ function $name:ident $params { $body ... }
  } => {
    letstx $ctx = [makeIdent('ctx', #{$_})];
    letstx $args = [makeIdent('args', #{$_})];

    return #{
      function $name $params {
        macro try {        
          rule { $tryBody catch $catchParams $catchBody finally $finallyBody } => {
            return Promise.cast()
            .then(function () $tryBody)
            .catch(function $catchParams $catchBody)
            .finally(function () $finallyBody);
          }
        
          rule { $tryBody catch $catchParams $catchBody } => {
            return Promise.cast()
              .then(function () $tryBody).catch(function $catchParams $catchBody);
          }
        }

        macro await {
          rule { $expression:expr ; $after $[...] } => {
              return $expression.then(function () {
                $after $[...]
              });
          }
        }
        
        let (var) = macro {
          rule { $identifier:ident = await $expression:expr $after $[...] } => {
            var $identifier;
            return $expression.then(function (value) {
              $identifier = value
              $after $[...]
            })
          }

          rule { $id } => { var $id }
        }
        
        let (=) = macro {
          rule infix { $leftExpr:expr | await $rightExpr:expr $after $[...] } => {
            return $rightExpr.then(function (value) {
              $leftExpr = value
              $after $[...]
            })
          }
          
          rule infix { $left:expr | $right:expr } => { $left = $right }
        }
        
        var $ctx = this, $args = arguments;
        
        let (this) = macro {
          rule {} => { $ctx }
        }
        
        let (arguments) = macro {
          rule {} => { $args }
        }
        
        return Promise.cast()
          .then(function () {            
            $body ...
          });
      }
    };
  }
}
