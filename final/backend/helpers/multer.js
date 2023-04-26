const path = require('path');
const multer = require('multer');
const fs = require('fs');

const uploadPath = path.join(__dirname, '../public', 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

function uploadFile(req, res, next) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
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

    const limits = {
        fileSize: 5 * 1024 * 1024,
    };

    const upload = multer({ storage, limits, fileFilter }).array('image');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: 'invalid-image' });
        }

        next();
    });
}

module.exports = uploadFile;
