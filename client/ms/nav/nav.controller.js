(function() {
  'use strict';

  angular
    .module('ms')
    .controller('NavController', NavController);

  function NavController($state, userService) {
    var vm = this;

    vm.shouldShow = shouldShow;
    vm.logout = logout;

    function logout() {
      userService
        .logout()
        .then(function() {
          $state.go('login');
        });
    }

    function shouldShow() {
      return !$state.is('login');
    }
  }
})();
