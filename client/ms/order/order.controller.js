(function() {
  'use strict';

  angular
    .module('ms')
    .controller('OrderController', OrderController);

  function OrderController() {
    var vm = this;

    vm.plans = [
      {
        name: '莱芜工地第八项目部',
        date: new Date(2016, 3, 14),
        steelCount: 40000,
        fastenerCount: 42323,
        status: '申请中'
      },
      {
        name: '莱芜工地第八项目部',
        date: new Date(2016, 3, 14),
        steelCount: 40000,
        fastenerCount: 42323,
        status: '已阅读'
      },
      {
        name: '莱芜工地第八项目部',
        date: new Date(2016, 3, 14),
        steelCount: 40000,
        fastenerCount: 42323,
        status: '计算中'
      },
      {
        name: '莱芜工地第八项目部',
        date: new Date(2016, 3, 14),
        steelCount: 40000,
        fastenerCount: 42323,
        status: '已发货'
      }
    ];

  }
})();
