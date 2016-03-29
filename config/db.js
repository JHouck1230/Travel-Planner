'use strict';

var mysql = require('mysql');
require('dotenv').config();
console.log(process.env.DB);
var connection = mysql.createConnection(process.env.DB);
var connection = mysql.createConnection(process.env.JAWSDB_URL || {
  host: 'localhost',
  user: 'root',
  password: 'testing',
  database: 'travel'
});
connection.connect(function(err){
  if (err) {
    console.log("err: ", err);
  } else {
    console.log("connection success!");
  }

});

module.exports = connection;
