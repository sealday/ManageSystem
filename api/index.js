var express = require('express'),
  crypto = require('crypto'),
  mongodb = require('mongodb'),
  ObjectId = mongodb.ObjectId,
  router = express.Router(),
  auth = require('./auth'),
  user = require('./user'),
  order = require('./order');

module.exports = function(db) {
  router.post('/login', auth.login(db));

  // 认证中间件
  router.use(auth.middleware(db));

  router.get('/users', user.getUsers(db));
  router.put('/users/:id', user.updateUser(db));

  router.get('/orders', order.getOrders(db));

  return router;
};

