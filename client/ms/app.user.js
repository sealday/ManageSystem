(function() {
  'use strict';

  angular
    .module('ms')
    .factory('userService', userService)
    .factory('userInterceptor', userInterceptor);

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
          .then(function(result) {
            // 设置token
            $window.localStorage.setItem('token', result.data.token);
            resolve();
          }, function() {
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

  function userInterceptor($window, $q) {
    return {
      request: request,
      responseError: responseError
    };

    function request(config) {
      if (config.url.match(/^\/api\/.*$/) != null) {
        config.headers['token'] = $window.localStorage.getItem('token');
      }
      return config;
    }

    function responseError(rejection) {
      if (rejection.status == 403) {
        // 非授权的行为
        // TODO 现在出现这个情况就只要清除 token 就可以了 以后会有更复杂的情况
        $window.localStorage.removeItem('token');
      }
      return $q.reject(rejection);
    }
  }
})();
