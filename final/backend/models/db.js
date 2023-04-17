const UserSchema = require('./userSchema');
const PostSchema = require('./postSchema');

exports.userDB = new UserSchema();
exports.postDB = new PostSchema();
