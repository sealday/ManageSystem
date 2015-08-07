var crypto = require('crypto'),
  mongodb = require('mongodb'),
  ObjectId = mongodb.ObjectId;

module.exports.login = function(db) {
  return function(req, res) {
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

  }
};

module.exports.middleware = function(db) {
  return function(req, res, next) {
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
  }
};
