(function() {
  'use strict';

  angular
    .module('ms')
    .controller('HomeController', HomeController);

  function HomeController(userService, $state) {
    var vm = this;

    vm.logout = logout;

    function logout() {
      userService
        .logout()
        .then(function() {
          $state.go('login');
        });
    }
  }
})();
