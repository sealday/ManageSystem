(function() {
  'use strict';

  angular
    .module('ms')
    .factory('userService', userService);

  function userService($window, $q, $http) {
    var service = {};

    service.isLogin = isLogin;
    service.login = login;
    service.logout = logout;

    return service;

    function isLogin() {
      // 通过查看 token 这个是否在本地存储中存在来判断是否登录过
      return !!$window.localStorage.getItem("token");
    }

    function login(user) {
      return $q(function(resolve, reject) {
        $http
          .post('/api/login', user)
          .then(function(data) {
            // 设置token
            $window.localStorage.setItem('token', data.token);
            resolve();
          })
          .catch(function() {
            reject();
          });
      });
    }

    function logout() {
      return $q(function(resolve) {
        $window.localStorage.removeItem('token');
        resolve();
      });
    }
  }
})();
