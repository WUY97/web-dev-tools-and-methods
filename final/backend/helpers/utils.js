exports.isValidUsername = (username) => {
    return typeof username === 'string' && username.match(/^[A-Za-z0-9]{3,20}$/);
}

exports.isValidTag = (tag) => {
    return typeof tag === 'string' && tag.match(/^[A-Za-z0-9]{1,20}$/);
}

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
}