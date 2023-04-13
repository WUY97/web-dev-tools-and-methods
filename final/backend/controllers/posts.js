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

    if (typeof tags !== 'string' && !Array.isArray(tags)) {
        res.status(400).json({ error: 'invalid-tags' });
        return;
    }

    if (typeof tags === 'string' && !isValidTag(tags)) {
        res.status(400).json({ error: 'invalid-tags' });
        return;
    }

    if (Array.isArray(tags)) {
        if (tags.length === 0 || tags.length > 5) {
            res.status(400).json({ error: 'invalid-tags' });
            return;
        }

        for (let tag of tags) {
            if (typeof tag !== 'string' || !isValidTag(tag)) {
                res.status(400).json({ error: 'invalid-tags' });
                return;
            }
        }
    }

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
    const newPost = postDB.createPost(title, content, fileNames, tags, creator);

    res.status(201).json(newPost);
};

exports.getAllPosts = async (req, res) => {};

// exports.getPost = async (req, res) => {

// }

// exports.deletePost = async (req, res) => {

// }
