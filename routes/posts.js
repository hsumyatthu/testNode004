var express = require('express');
var router = express.Router();
var Post = require('../model/Post');

router.get('/postadd', function(req, res, next) {
  res.render('post/post-add', { title: 'Post Add' });
});

router.post('/postadd', function(req, res, next) {
  var post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.body.author;
  post.save(function (err, rtn){
    if(err) throw err;
    res.redirect('/posts/postlist');
  });
});

router.get('/postlist', function(req, res, next) {
  Post.find({}, function(err, rtn){
    if(err) throw err;
    res.render('post/post-list', { title: 'Post List', posts:rtn });
  })
});

router.get('/postdetail/:id', function(req, res, next) {
  Post.findById(req.params.id, function (err, rtn){
    if(err) throw err;
    res.render('post/post-detail', { title: 'Post Detail', posts:rtn });
  })
});

router.get('/postdel/:id', function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, function (err, rtn){
    if(err) throw err;
    res.redirect('/posts/postlist');
  })
});

router.get('/postupdate/:id', function(req, res, next) {
  Post.findById(req.params.id, function (err, rtn){
    if(err) throw err;
    res.render('post/post-update', { title: 'Post Update', posts:rtn });
  })
});

router.post('/postupdate', function(req, res, next) {
  var updateD = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  }
  Post.findByIdAndUpdate(req.body.id, {$set: updateD}, function (err,rtn){
    if (err) throw err;
    res.redirect('/posts/postlist');
  });
});

module.exports = router;
