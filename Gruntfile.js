module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('db', function() {
    var child_process = require('child_process');
    child_process.execFileSync('./bin/db');
  });
};
