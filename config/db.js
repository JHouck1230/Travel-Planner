'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection("mysql://qyxtzm4spakqp7zz:nyemz604yz132yro@izm96dhhnwr2ieg0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/mcc5v3u1snbf799o");
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
