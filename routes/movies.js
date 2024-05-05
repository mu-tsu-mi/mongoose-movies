const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const moviesCtrl = require('../controllers/movies');
const ensureLoggedIn = require('../config/ensureLoggedIn')
	
// GET /movies
router.get('/', moviesCtrl.index);
// Use ensureLoggedIn middleware to protect routes
router.get('/new', ensureLoggedIn, moviesCtrl.new);
// GET /movies/new: Replaced with ensureLoggedIn
// router.get('/new', moviesCtrl.new);
// GET /movies/:id (show functionality) MUST be below new route
router.get('/:id', moviesCtrl.show);
// POST /movies
router.post('/', moviesCtrl.create);
	
module.exports = router;
