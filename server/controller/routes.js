var express = require('express');
var path = require('path');

var router = express.Router();

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.get('/about', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/about.html'));
});

router.get('/blog', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/blog.html'));
});

router.get('/contact', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/contact.html'));
});

router.get('/secret', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/blog_post.html'));
});

router.get('*', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/404.html'));
});

module.exports = router;
