var express = require('express');
var router = express.Router();
var passport = require('passport');



router.get('/', function(req, res) {
  res.render('index');
});

router.post('/login', passport.authenticate('local', {session: false}),  function (req, res) {
	res.json(rq.user);


});

module.exports = router;