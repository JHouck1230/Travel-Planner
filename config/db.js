'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection("mysql://rh3i1d4i5vj3pxik:dc3nzhxjaliw4vdf@izm96dhhnwr2ieg0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/trygkfqphk92wr3o");
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
