(function() {
  'use strict';

  angular
    .module('ms')
    .controller('OrderController', OrderController);

  function OrderController($state) {
    var vm = this;

    vm.read = read;
    vm.newOrder = newOrder;
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

    vm.orders = [
      {
        from: '上海',
        to: '南京 ',
        date: new Date(),
        handler: '张琳'
      },
      {
        from: '上海',
        to: '南京 ',
        date: new Date(),
        handler: '张琳'
      },
      {
        from: '上海',
        to: '南京 ',
        date: new Date(),
        handler: '张琳'
      }
    ];

    function read(plan) {
      plan.status = '已阅读';
    }

    function newOrder() {
      $state.go('order.new');
    }

    function newPlanOrder() {
      $state.go('order.plan');
    }
  }
})();
