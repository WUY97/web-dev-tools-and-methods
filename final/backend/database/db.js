const UserDB = require('./users');
const PostDB = require('./posts');

exports.userDB = new UserDB();
exports.postDB = new PostDB();
