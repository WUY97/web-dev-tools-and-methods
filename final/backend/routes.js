module.exports = (app) => {
    const {
        getUser,
        createUser,
        deleteUser,
    } = require('./controllers/users.js');

    const {
        getAllPosts,
        createPost,
        getUserPosts,
        deletePost,
    } = require('./controllers/posts.js');

    const {
        createComment,
    } = require('./controllers/comments.js')

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

    router.get('/api/post', getAllPosts);
    router.post('/api/post', uploadFile, auth, createPost);
    router.get('/api/post/:username', auth, getUserPosts);
    router.delete('/api/post/:postId', auth, deletePost);

    router.post('/api/post/:postId/comment', auth, createComment);

    app.use('/', router);
};
