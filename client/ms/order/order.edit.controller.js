(function() {
  'use strict';

  angular
    .module('ms')
    .controller('OrderEditController', OrderEditController);

  function OrderEditController() {
    var vm = this;

    vm.order = {};
    vm.order.pipes = [{
      spec: 1.1,
      number: 100
    }];
    vm.order.fasteners = [];

    vm.add = add;
    vm.remove = remove;

    function add(products) {
      products.push({});
    }

    function remove(products, product) {
      products.forEach(function(currentValue, index, array) {
        if (currentValue == product) {
          array.splice(index, 1);
        }
      });
    }
  }
})();
