(function() {
  'use strict';

  angular
    .module('ms')
    .config(interceptorConfig);

  function interceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('userInterceptor');
  }
})();
