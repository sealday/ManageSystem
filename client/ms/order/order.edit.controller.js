(function() {
  'use strict';

  angular
    .module('ms')
    .controller('OrderEditController', OrderEditController);

  function OrderEditController(orderSerivce, $scope) {
    var vm = this;
    vm.allProducts = orderSerivce.allProducts;
    vm.total = total;
    vm.add = add;
    vm.remove = remove;
    vm.unit = unit;
    vm.specs = specs;
    vm.weight = weight;
    vm.initProduct = initProduct;
    vm.onKeyup = onKeyup;
    vm.init = init;

    vm.init();

    function add(product) {
      product.items.push({});
    }

    function remove(products, product) {
      products.forEach(function(currentValue, index, array) {
        if (currentValue == product) {
          array.splice(index, 1);
        }
      });
    }

    function total(items, productName) {
      var count = 0;;
      var type = orderSerivce.allProductsTable[productName].type;
      var fixed = 0;
      items.forEach(function(i) {
        var spec = parseFloat(i.spec);
        if (type == 'a') {
          fixed = 1;
        } else if (type == 'b') {
          spec = 1;
          fixed = 0;
        }
        count += i.number * spec;
      });

      return count.toFixed(fixed);
    }

    function unit(productName) {
      return orderSerivce.allProductsTable[productName].unit;
    }

    function specs(productName) {
      return orderSerivce.allProductsTable[productName].specs;
    }

    function weight() {
      var w = 0;
      angular.forEach(vm.products, function(product, productName) {
        if (!product.includes) return;
        w += vm.total(product.items, productName) / 3000;
      });
      return w.toFixed(2);
    }

    function initProduct(productName) {
      vm.products[productName].items = [];
      // 它会聚焦，这样的话，不方便连续操作
      // 所以暂时注释掉
      // vm.add(vm.products[productName]);
    }

    function onKeyup(e, product) {
      e.preventDefault();
      if (e.keyCode == 13) {
        vm.add(product);
      }
    }

    function init() {
      vm.order = {};
      vm.driver = {};
      vm.products = {};
      vm.order.price = 0;
    }
  }
})();
