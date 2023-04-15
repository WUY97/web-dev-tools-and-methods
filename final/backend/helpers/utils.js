exports.isValidUsername = (username) => {
    return (
        typeof username === 'string' && username.match(/^[A-Za-z0-9]{3,20}$/)
    );
};

exports.isValidTag = (tagString) => {
    const tags = tagString.split(/\s+/);
    for (let tag of tags) {
        if (!tag.startsWith('#')) {
            return false;
        }

        if (tag.length > 21 || tag.length === 1) {
            return false;
        }

        for (let i = 1; i < tag.length; i++) {
            if (!tag[i].match(/[A-Za-z0-9]/)) {
                return false;
            }
        }
    }

    return true;
};

const imageRegex = /^image\/(jpeg|jpg|png)$/;
exports.isValidImage = (image) => {
    if (!image) {
        return false;
    }

    if (!image.fieldname || image.fieldname !== 'image') {
        return false;
    }

    if (!image.mimetype || !imageRegex.test(image.mimetype)) {
        return false;
    }

    return true;
};
