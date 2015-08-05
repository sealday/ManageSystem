(function() {
  'use strict';

  angular
    .module('ms')
    .factory('userService', userService);

  function userService($window, $q) {
    var service = {};

    service.isLogin = isLogin;
    service.login = login;
    service.logout = logout;

    return service;

    function isLogin() {
      // 通过查看 logged 这个是否在本地存储中存在来判断是否登录过
      return !!$window.localStorage.getItem("logged");
    }

    function login(user) {
      return $q(function(resolve) {
        // 设置logged，无论设置成什么都可以，包括null和undefined都能使得这个logged存在
        $window.localStorage.setItem('logged', 'logged');
        resolve();
      });
    }

    function logout() {
      return $q(function(resolve) {
        $window.localStorage.removeItem('logged');
        resolve();
      });
    }
  }
})();
