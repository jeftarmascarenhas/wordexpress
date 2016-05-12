var express = require('express');
var router = express.Router();
var Controller = require('../controllers/friends.controller');
var authRouters =  require('../middleware/auth.routers');

router.get('/', authRouters,function (req, res) {
  Controller.index(req, res);
});

router.get('/cadastro', authRouters, function (req, res) {
  Controller.create(req, res);
});

router.post('/cadastro', authRouters, function (req, res) {
  Controller.post(req, res);
});

router.get('/lista/:id', authRouters, function (req, res) {
  Controller.retrieve(req, res);
});

router.get('/profile/:id', function (req, res) {
  Controller.edit(req, res);
});
router.post('/edit/:id', authRouters, function (req, res) {
  Controller.update(req, res);
});

router.post('/delete:id', authRouters, function (req, res) {
  Controller.delete(req, res);
});

module.exports = router;
