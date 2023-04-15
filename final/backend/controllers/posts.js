const { userDB, postDB } = require('../database/db');
const { isValidTag, isValidImage } = require('../helpers/utils');

exports.createPost = async (req, res) => {
    const { title, content, tags } = req.body;
    const images = req.files;
    const { sid } = req.cookies;
    const creator = userDB.getSessionUser(sid);

    if (!title || !content || !tags || !creator) {
        res.status(400).json({ error: 'required-fields-missing' });
        return;
    }

    if (!images || images.length === 0) {
        res.status(400).json({ error: 'required-fields-missing' });
        return;
    }

    if (typeof title !== 'string' || title.length > 50 || title.length === 0) {
        res.status(400).json({ error: 'invalid-title' });
        return;
    }

    if (
        typeof content !== 'string' ||
        content.length > 150 ||
        content.length === 0
    ) {
        res.status(400).json({ error: 'invalid-content' });
        return;
    }

    if (typeof tags !== 'string') {
        res.status(400).json({ error: 'invalid-tags' });
        return;
    }

    if (!isValidTag(tags)) {
        res.status(400).json({ error: 'invalid-tags' });
        return;
    }

    const cleanedTags = tags.replace(/#\S+\s*/g, (match) => match.replace(/\s+/g, ' '));

    if (images.length > 5) {
        res.status(400).json({ error: 'invalid-image' });
        return;
    }

    for (let image of images) {
        if (!isValidImage(image)) {
            res.status(400).json({ error: 'invalid-image' });
            return;
        }
    }

    const fileNames = images.map((image) => image.filename);
    const newPost = postDB.createPost(title, content, fileNames, cleanedTags, creator);

    res.status(201).json(newPost);
};

exports.getAllPosts = async (req, res) => {
    const posts = postDB.getAllPosts();
    res.status(200).json(posts);
};

// exports.getUserPosts = async (req, res) => {

// }

// exports.deletePost = async (req, res) => {

// }
