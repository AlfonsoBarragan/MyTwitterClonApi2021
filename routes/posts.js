var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Post = require('../models/Post.js');
var db = mongoose.connection;

// Get all the posts
router.get('/', function(req, res, next) {
    Post.find().sort('-publicationdate').exec(function(err, posts) {
	if (err) res.status(500).send(err);
	else res.status(200).json(posts);
    });

});

// Get all the post from an user (throught its email)
router.get('/all/:email', function (req, res){
    Post.find({'email':req.params.email}).sort('-publicationdate').exec(function(err, posts) {
	if (err) res.status(500).send(err);
	else res.status(200).json(posts);
    });
});

// Post a post 
router.post('/', function (req, res) {
    Post.create(req.body, function (err, postinfo) {
	if (err) res.status(500).send(err);
	else res.sendStatus(200);
    });
});

// Update a post throught its id
router.put('/:id', function (req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, function (err, postinfo){
	if (err) res.status(500).send(err);
	else res.sendStatus(200);
    });
});

// Delete a post throught its id
router.delete('/:id', function (req, res) {
    Post.findByIdAndDelete(req.params.id, function (err, res) {
	if (err) res.status(500).send(err);
	else res.sendStatus(200);
    });
});

module.exports = router;
