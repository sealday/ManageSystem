(function() {
  "use strict";

  angular
    .module('ms')
    .directive('focusNext', focusNext)
    .directive('focusMe', focusMe);

  function focusMe() {
    return function(scope, elem, attr) {
      console.log(elem[0].focus());
    };
  }

  function focusNext() {
    return function(scope, elem, attr) {
      angular.element(elem[0]).on('keyup', function(e){
        e.preventDefault();
        if (e.keyCode == 13) {
          angular.element(elem[0]).parent().next().children()[0].focus();
        }
      });
    };
  }
})();
