(function() {
  'use strict';

  angular
    .module('ms')
    .controller('OrderEditController', OrderEditController);

  function OrderEditController() {
    var vm = this;

    vm.order = {};
    vm.total = total;
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

    function total(items) {
      var count = 0;;
      items.forEach(function(i) {
        var spec = parseFloat(i.spec);
        spec = isNaN(spec) ? 1 : spec;
        count += i.number * spec;
      });

      return count;
    }
  }
})();
