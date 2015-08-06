(function() {
  'use strict';

  angular
    .module('ms')
    .controller('NavController', NavController);

  function NavController($state) {
    var vm = this;

    vm.shouldShow = shouldShow;

    function shouldShow() {
      return !$state.is('login');
    }
  }
})();
