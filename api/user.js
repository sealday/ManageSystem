var crypto = require('crypto'),
  mongodb = require('mongodb'),
  ObjectId = mongodb.ObjectId;

module.exports.getUsers = function(db) {
  return function(req, res, next) {
    var users = db.collection('users');
    users
      .find({})
      .toArray(function(err, users) {
        if (err) {
          return next(err);
        }
        res.json(users);
      });
  };
};

module.exports.updateUser = function(db) {
  return function(req, res, next) {
    var users = db.collection('users');
    var username = req.body.username || '';
    var password = req.body.password || '';
    var id = req.params.id;

    // 如果是修改密码，并且长度符合要求
    if (password.length >= 6) {
      var token = crypto
        .createHash('sha256')
        .update(ObjectId().toString())
        .update(username)
        .update(password)
        .digest('hex');

      crypto.pbkdf2(password, id, 10000, 512, 'sha256', function (err, key) {
        if (err) {
          return next(err);
        }
        var password = key.toString('hex');
        users.updateOne({_id: ObjectId(id)}, {
          $set: {
            password: password,
            token: token
          }
        }, function (err, result) {
          if (err) {
            return next(err);
          }
          // TODO 需要确认result，才能知道是否真的修改成功
          res.status(204).end();
        })
      });
    } else {
      // 修改其他的信息，暂时没有
      users.updateOne({_id: ObjectId(id)}, {
        $set: {
        }
      }, function(err, result) {
        if (err) {
          return next(err);
        }
        res.status(204).end();
      })
    }
  };
};


