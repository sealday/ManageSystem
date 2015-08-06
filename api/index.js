var express = require('express'),
  crypto = require('crypto'),
  mongodb = require('mongodb'),
  ObjectId = mongodb.ObjectId,
  router = express.Router();

module.exports = function(db) {
  router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var token = crypto
      .createHash('sha256')
      .update(ObjectId().toString())
      .update(username || '')
      .update(password || '')
      .digest('hex');

    var users = db.collection('users');
    users.findOne({
      username: username
    }, function(err, result) {
      if (err) {
        next(err);
        return;
      }
      if (result != null) {
        crypto.pbkdf2(password, result._id.toString(), 10000, 512, 'sha256', function(err, key) {
          if (err) {
            next(err);
            return;
          }
          if (key.toString('hex') == result.password) {
            users.updateOne({
              username: username
            }, {
              $set: {
                token: token
              }
            }, function(err) {
              if (err) {
                next(err);
                return;
              }
              res.json({
                token: token
              });
            })
          } else {
            res.status(401).end();
          }
        });
      } else {
        res.status(401).end();
      }
    });

  });

// 认证中间件
  router.use(function(req, res, next) {
    var token = req.headers.token || '';
    if (token.length > 0) {
      var users = db.collection('users');
      users.findOne({
        token: token
      }, function(err, result) {
        if (err) {
          next(err);
          return;
        }
        if (result != null) {
          req.user = result;
          next();
        } else {
          res.status(403).end();
        }
      });
    } else {
      res.status(403).end();
    }
  });

  router.get('/users', function(req, res, next) {
    var users = db.collection('users');
    users
      .find({})
      .toArray(function(err, users) {
        if (err) {
          return next(err);
        }
        res.json(users);
      });
  });

  router.put('/users/:id', function(req, res, next) {
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
  });




  return router;
};

