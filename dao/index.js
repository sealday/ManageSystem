var mongodb = require('mongodb'),
  MongoClient = mongodb.MongoClient,
  settings = require('../settings');

module.exports = function() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(settings.mongodbUrl, function(err, db) {
      // 若发生错误则直接退出程序
      if (err) {
        return reject(err);
      }

      var users = db.collection('users');

      // 用户名唯一
      users.createIndex({username: 1}, {unique: true}, function(err) {
        if (err) {
          return reject(err);
        }
      });

      // token 唯一
      users.createIndex({token: 1}, {unique: true, sparse: true}, function(err) {
        if (err) {
          return reject(err);
        }
      });

      return resolve(db);
    });

  });
};

