const { postDB, userDB } = require('../models/db');

exports.createComment = async (req, res) => {
    const { content, replyTo } = req.body;
    const { postId } = req.params;
    const { sid } = req.cookies;
    const creator = userDB.getSessionUser(sid);

    if (!content || !creator || !postId) {
        res.status(400).json({ error: 'required-fields-missing' });
        return;
    }

    if (!postDB.getPostById(postId)) {
        res.status(404).json({ error: 'post-not-found' });
        return;
    }

    const comment = postDB.addComment(postId, content, creator, replyTo);

    if (!comment) {
        return res.status(404).json({ error: 'comment-not-found' });
    }
    return res.json(comment);
};

exports.getPostComments = async (req, res) => {
    const { postId } = req.params;
    const comments = postDB.getCommentsByPostId(postId);

    if (!comments) {
        res.status(404).json({ error: 'post-not-found' });
        return;
    }

    res.json(comments);
}
