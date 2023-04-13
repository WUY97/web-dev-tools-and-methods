const { userDB, postDB } = require('../database/db');

exports.createPost = async (req, res) => {
    const { title, content, tags} = req.body;
    const images = req.files;
    const { sid } = req.cookies;
    const creator = userDB.getSessionUser(sid);

    // console.log(req.body);
    console.log(req.files)

    if (!title || !content || !tags ||  !creator) {
        res.status(400).json({ error: 'required-fields-missing' });
        return;
    }

    if (typeof title !== "string" || title.length > 50 || title.length === 0) {
        res.status(400).json({ error: 'invalid-title' });
        return;
    }

    if (
        typeof content !== "string" ||
        content.length > 150 ||
        content.length === 0
    ) {
        res.status(400).json({ error: 'invalid-content' });
        return;
    }

    if (typeof tags !== "object" && tags.length > 5) {
        res.status(400).json({ error: 'invalid-tags' });
        return;
    }

    for (let image of images) {
        if (!image.fieldname || image.fieldname !== 'image') {
            res.status(400).json({ error: 'invalid-image' });
            return;
        }

        const imageRegex = /^image\/(bmp|gif|jpeg|jpg|png|svg\+xml|tiff|webp)$/;
        if (!image.mimetype || !imageRegex.test(image.mimetype)) {
            res.status(400).json({ error: 'invalid-image' });
            return;
        }
    }

    const fileNames = images.map((image) => image.filename);
    const newPost = postDB.createPost(
        title,
        content,
        fileNames,
        tags,
        creator
    );

    res.status(201).json(newPost);
};

exports.getAllPosts = async (req, res) => {};

// exports.getPost = async (req, res) => {

// }

// exports.deletePost = async (req, res) => {

// }
