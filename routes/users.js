var express = require('express');
var router = express.Router();
var Controller = require('../controllers/users.controller.js');

/**
 * [Router index users]
 * @param  {[type]} req  [request]
 * @param  {[type]} res) {	Controller.index(req, res);} [controler index page users]
 * @return {[type]}      [Render page index]
 */
router.get('/', function (req, res) {
	Controller.index(req, res);
});

/**
 * [Router list users]
 * @param  {[type]} req   [request]
 * @param  {[type]} res   [response]
 * @param  {[type]} next) {             Controller.retrieve(req, res);} [Controller list all users]
 * @return {[type]}       [Render page list]
 */
router.get('/lista', function(req, res, next) {
  Controller.retrieve(req, res);
});

/**
 * [Router create users]
 * @param  {[type]} req  [request]
 * @param  {[type]} res) {Controller.create(req, res);} [Controller create users]
 * @return {[type]}      [Render page create users]
 */
router.get('/cadastro', function (req, res) {
	
	Controller.create(req, res);
});

router.post('/cadastro', function (req, res) {
	Controller.post(req, res);
});

router.get('/profile/:id', function (req, res) {
	Controller.findOne(req, res);
});

router.get('/edit/:id', function (req, res) {
	Controller.update(req, res);
});

router.post('/delete/:id', function (req, res) {
	Controller.delete(req, res);
});

module.exports = router;
