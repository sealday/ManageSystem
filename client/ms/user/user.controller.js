(function() {
  'use strict';

  angular
    .module('ms')
    .controller('UserController', UserController);

  function UserController($http) {
    var vm = this;

    vm.users = [];
    vm.save = save;
    vm.getUsers = getUsers;
    vm.addUser = addUser;

    vm.newUser = {};
    vm.getUsers();

    function getUsers() {
      $http
        .get('/api/users')
        .then(function(result) {
          vm.users.splice(0, vm.users.length);
          result.data.forEach(function(user) {
            user.editing = false;
            vm.users.push(user);
          });
        }, function(result) {
          console.error(result);
        });
    }

    function save(user) {
      $http.put('/api/users/' + user._id, {
        password: user.rawPassword
      }).then(function() {
        alert('修改成功');
      }, function(result) {
        alert('修改失败');
      });
      user.rawPassword = '';
      user.editing = false;
    }

    function addUser() {
      console.log('add user');
      $http.post('/api/users', {
        username: vm.newUser.username,
        password: vm.newUser.password
      }).then(function(result) {
        console.log(result);
        getUsers();
        vm.newUser = {};
      }, function(result) {
        console.log(result);
      });
    }
  }
})();
