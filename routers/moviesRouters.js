const express = require('express');

const router = express.Router();

const moviesController = require('../controllers/moviesController');

// Rotta per ottenere tutti i film
router.get('/', moviesController.index);

// Rotta per ottenere un film specifico per ID
router.get('/:id', moviesController.show);

module.exports = router;