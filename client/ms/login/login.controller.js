(function() {
  'use strict';

  angular
    .module('ms')
    .controller('LoginController', LoginController);

  function LoginController(userService, $state) {
    var vm = this;

    vm.username = '';
    vm.password = '';
    vm.login = login;

    function login() {
      userService.login({
        username: vm.username,
        password: vm.password
      }).then(function() {
        $state.go('home');
      }).catch(function() {
        alert('帐号或者密码错误');
      });

      // clear password
      vm.password = '';
    }
  }
})();
