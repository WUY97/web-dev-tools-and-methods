const path = require('path');
const multer = require('multer');

function uploadFile(req, res, next) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads'));
        },

        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        },
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('invalid-image'), false);
        }
    };

    const upload = multer({ storage, fileFilter }).array('image');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: 'invalid-image' });
        }

        next();
    });
}

module.exports = uploadFile;
