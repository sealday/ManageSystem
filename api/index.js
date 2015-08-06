var express = require('express'),
  crypto = require('crypto'),
  mongodb = require('mongodb'),
  ObjectId = mongodb.ObjectId,
  router = express.Router();

module.exports = function(db) {
  router.post('/login', function(req, res) {
    console.log(req.headers);
    var username = req.body.username;
    var password = req.body.password;

    var hash = crypto.createHash('sha256');
    hash.update(ObjectId().toString());
    hash.update(username || '');
    hash.update(password || '');
    var token = hash.digest('hex');
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

  return router;
};

