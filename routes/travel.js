'use strict';

var express = require('express');
var router = express.Router();

var db = require('../config/db');

router.get('/', function(req, res) {
  db.query('SELECT * FROM destinations', function(err, destinations) {
    if(err) return res.status(400).send(err);
    res.send(destinations);
  })
})

router.get('/notes', function(req, res) {
  db.query('SELECT * FROM notes', function(err, notes) {
    if(err) return res.status(400).send(err);
    res.send(notes);
  })
})

router.get('/destinations/notes/:location', function(req, res){
  db.query(`SELECT notes.*, destinations.location FROM notes LEFT JOIN destinations ON notes.location = destinations.location WHERE notes.location = '${req.params.location}';`, function(err, notes) {
    if(err) return res.status(400).send(err);
    res.send(notes);
  });
});

router.post('/destinations', function(req, res) {
  db.query(`INSERT INTO destinations SET ?`, req.body, function(err, destinations) {
    if(err) return res.status(400).send(err);
    res.send(destinations);
  });
});

router.post('/destinations/notes', function(req, res) {
  db.query(`INSERT INTO notes SET ?`, req.body, function(err, notes) {
    if(err) return res.status(400).send(err);
    res.send(notes);
  });
});


// FIX DELETE BELOW THIS COMMENT! ATTEMPTING TO DELETE A DESTINATION AND ALL NOTES WITH THAT LOCATION


router.delete('/destinations/:location', function(req, res) {
  db.query(`DELETE destinations, notes FROM destinations INNER JOIN notes WHERE destinations.location = '${req.params.location}'`, function(err, destinations) {
    if(err) return res.status(400).send(err);
    res.send(destinations);
  });
});

router.delete('/destinations/notes/:id', function(req, res) {
  db.query(`DELETE FROM notes WHERE id = ${req.params.id}`, function(err, notes) {
    if(err) return res.status(400).send(err);
    res.send(notes);
  });
});

router.put('/')

module.exports = router;
