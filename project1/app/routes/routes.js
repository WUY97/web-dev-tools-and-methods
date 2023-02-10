module.exports = (app) => {
    const express = require('express');
    const router = express.Router();

    const homeController = require('../controllers/index');
    const loginController = require('../controllers/login');
    const logoutController = require('../controllers/logout');
    const guessController = require('../controllers/guess');
    const newGameController = require('../controllers/newGame');

    // Home page endpoint
    router.get('/', homeController.get);

    // Login endpoint
    router.post('/login', loginController.post);

    // Logout endpoint
    router.post('/logout', logoutController.post);

    // Guess endpoint
    router.post('/guess', guessController.post);

    // New game endpoint
    router.post('/new-game', newGameController.post);

    app.use('/', router);
};