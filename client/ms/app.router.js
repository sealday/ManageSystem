/**
 *
 * 这个文件用于配置前台页面路由
 *
 * @author Seal
 */
(function() {
  'use strict';
  angular
    .module('ms')
    .config(routerConfig);

  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'ms/home/home.html',
        controller: 'HomeController',
        controllerAs: 'hc'
      }).state('login', {
        url: '/login',
        templateUrl: 'ms/login/login.html',
        controller: 'LoginController',
        controllerAs: 'lc'
      }).state('staff', {
        url: '/staff',
        templateUrl: 'ms/staff/staff.html',
        controller: 'StaffController',
        controllerAs: 'sc'
      });
  }
})();
