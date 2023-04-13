module.exports = (app) => {
    const {
        getUser,
        createUser,
        deleteUser,
    } = require('./controllers/users.js');

    const { createPost } = require('./controllers/posts.js');

    const router = require('express').Router();
    const auth = require('./helpers/auth.js');
    const uploadFile = require('./helpers/multer.js');

    router.get('/api', (req, res) => {
        res.status(200).send({
            message: 'Connected!',
        });
    });
    router.post('/api/session', createUser);
    router.get('/api/session', getUser);
    router.delete('/api/session', deleteUser);

    // router.get('/api/post', getAllPosts);
    router.post('/api/post', uploadFile, auth, createPost);
    // router.get('api/post/:postId', getPost);
    // router.delete('/api/post/:postId', deletePost);

    // router.get('/api/post/:id/comments', getAllComments);
    // router.post('/api/post/:id/comments', createComment);
    // router.delete('/api/post/:id/comments/:commentId', deleteComment);

    app.use('/', router);
};
