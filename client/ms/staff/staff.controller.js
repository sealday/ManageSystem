(function() {
  'use strict';

  angular
    .module('ms')
    .controller('StaffController', StaffController);

  function StaffController() {
    var vm = this;

    vm.staffs = [
      {
        name: 'seal',
        bankId: '---',
        job: '---'
      }
    ]

  }
})();
