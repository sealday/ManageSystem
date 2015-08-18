(function() {
  "use strict";

  angular
    .module('ms')
    .factory('orderSerivce', orderSerivce);

  function orderSerivce() {
    var instance = {};
    var allProducts = [
    {
      name: '钢管',
      specs: [
        0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
        1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
        2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
        3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
        4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
        5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9,
        6.0
      ],
      type: 'a',
      unit: '米'
    },
    {
      name: '扣件',
      specs: [
        '直接', '转向', '十字'
      ],
      type: 'b',
      unit: '只'
    },
    {
      name: '套筒',
      specs: [
        '10CM', '20CM', '30CM'
      ],
      type: 'b',
      unit: '只'
    },
    {
      name: '顶丝',
      specs: [
        '上托', '下托'
      ],
      type: 'b',
      unit: '支'
    },
    {
      name: '工字钢',
      specs: [
        1.5, 1.6, 1.7, 1.8, 1.9, 2.0,
        2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0,
        3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0,
        4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0,
        5.5, 6.0, 9.0
      ],
      type: 'a',
      unit: '米'
    },
    {
      name: '槽钢',
      specs: [
        1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 9.0
      ],
      type: 'a',
      unit: '米'
    },
    {
      name: '立杆轮扣',
      specs: [
        0.15, 0.3, 0.6
      ],
      type: 'a',
      unit: '米'
    }
    ]

    var allProductsTable = {};
    allProducts.forEach(function(product, index) {
      allProductsTable[product.name] = product;
      product.index = index;
      product.specs.forEach(function(spec, index, array) {
        array[index] = String(spec);
      });
    });

    instance.allProducts = allProducts;
    instance.allProductsTable = allProductsTable;

    return instance;
  }

})();
