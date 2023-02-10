module.exports = (app) => {
    const express = require('express');
    const router = express.Router();

    const homeController = require('../controllers/index');
    const loginController = require('../controllers/login');
    const logoutController = require('../controllers/logout');
    const storeController = require('../controllers/store');

    // Home page endpoint
    router.get('/', homeController.get);

    // Login endpoint
    router.post('/login', loginController.post);

    // Logout endpoint
    router.post('/logout', logoutController.post);

    // Store endpoint
    router.post('/store', storeController.post);

    app.use('/', router);
};
