var crypto = require('crypto'),
  mongodb = require('mongodb'),
  ObjectId = mongodb.ObjectId;

module.exports.getOrders = function(db) {
  return function(req, res, next) {
    var orders = db.collection('orders');


  };
};
