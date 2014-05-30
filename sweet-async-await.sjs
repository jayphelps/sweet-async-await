macro async {
  case {
    $_ function $name:ident $params { $body ... }
  } => {
    letstx $ctx = [makeIdent('ctx', #{$_})];

    return #{
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
        rule infix { $identifier | await $expression:expr $after $[...] } => {
          return $expression.then(function (value) {
            $identifier = value
            $after $[...]
          })
        }
        
        rule infix { $left:expr | $right:expr } => { $left = $right }
      }

      function $name $params {
        var $ctx = this;
        let (this) = macro {
          rule {} => { $ctx }
        }
        
        return Promise.cast()
          .then(function () {            
            $body ...
          });
      }
    };
  }
}
