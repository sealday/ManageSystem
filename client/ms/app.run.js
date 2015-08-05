(function() {
  'use strict';

  angular
    .module('ms')
    .run(run);

  function run(userService, $state, $rootScope) {

    // 会不会出现，这个事件已经发生，但是这个监听器刚加上的情况？（也就是发生页面跳转了，没有及时拦住它）
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (userService.isLogin() || toState.name == 'login') {

      } else {
        event.preventDefault();
        $state.go('login');
      }

    });
  }
})();
