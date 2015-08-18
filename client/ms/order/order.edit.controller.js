(function() {
  'use strict';

  angular
    .module('ms')
    .controller('OrderEditController', OrderEditController);

  function OrderEditController(orderSerivce, $scope) {
    var vm = this;
    vm.allProducts = orderSerivce.allProducts;
    vm.products = {};
    vm.total = total;
    vm.add = add;
    vm.remove = remove;
    vm.unit = unit;
    vm.specs = specs;
    vm.weight = weight;
    vm.initProduct = initProduct;
    vm.onKeyup = onKeyup;

    function add(product) {
      if (product.items === undefined) {
        product.items = [];
      }
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
    }

    function onKeyup(e, product) {
      e.preventDefault();
      if (e.keyCode == 13) {
        // 如果能够自动跳转到下一个输入框就好了
        vm.add(product);
      }
    }
  }
})();
