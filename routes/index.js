const express = require('express');
const models = require('../models');
const router = express.Router();

//==routing==//
//home//
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

//board - read//
router.get('/board', (req, res, next) => {
  models.post.findAll().then((result) => {
    res.render('show', {
      posts: result
    });
  });
});

//board - create//
router.post('/board', (req, res, next) => {
  let body = req.body;

  models.post.create({
    title: body.inputTitle,
    writer: body.inputWriter
  })
  .then((result) => {
    console.log('data add success');
    res.redirect('/board');
  })
  .catch((err) => {
    console.log('data add fail');
    console.error(err);
  });
});

//edit - read//
router.get('/edit/:id', (req, res, next) => {
  let postID = req.params.id;

  models.post.findOne({
    where: {id: postID}
  })
  .then((result) => {
    res.render('edit', {
      post: result
    });
  })
  .catch((err) => {
    console.log('data show fail');
    console.error(err);
  });
});

//edit - update//
router.put('/edit/:id', (req, res, next) => {
  let postID = req.params.id;
  let body =  req.body;

  models.post.update({
    title: body.editTitle,
    writer: body.editWriter
  },{
    where: {id: postID}
  })
  .then((result) => {
    console.log('data update sucess');
    res.redirect('/board');
  })
  .catch((err) => {
    console.log('data update fail');
    console.error(err);
  });
});

//delete - destroy//
router.delete('/board/:id', (req, res, next) => {
  let postID = req.params.id;

  models.post.destroy({
    where: {id: postID}
  })
  .then((result) => {
    res.redirect('/board');
  })
  .catch((err) => {
    console.log('data delete fail');
    console.error(err);
  });
});

module.exports = router;