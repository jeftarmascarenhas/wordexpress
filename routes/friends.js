var express = require('express');
var router = express.Router();
var Controller = require('../controllers/friends.controller');


router.get('/', function (req, res) {
  Controller.index(req, res);
});

router.get('/cadastro', function (req, res) {
  Controller.create(req, res);
});

router.post('/cadastro', function (req, res) {
  Controller.post(req, res);
});

router.get('/lista:id', function (req, res) {
  Controller.retrieve(req, res);
});

router.get('/edit:id', function (req, res) {
  Controller.edite(req, res);
});
router.post('/edit:id', function (req, res) {
  Controller.update(req, res);
});

router.post('/delete:id', function (req, res) {
  Controller.delete(req, res);
});

module.exports = router;
