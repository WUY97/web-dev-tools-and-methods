const UserSchema = require('./userSchema');
const PostSchema = require('./postSchema');

const userDB = new UserSchema();
const postDB = new PostSchema();

// seeds
if (process.env.NODE_ENV !== 'test') {
    userDB.createUser('admin');
    postDB.createPost(
        "My Grandparents' Cat",
        "Hi there! Here's my grandparents' cat Toefl",
        ['seed1.jpg', 'seed2.jpg'],
        "#cat #cute",
        'admin'
    )

    postDB.createPost(
        "My Cat",
        "Hi there! Here's my cat 66",
        ['seed3.jpg', 'seed4.jpg'],
        "#cat #cute",
        'admin'
    )
}

postDB.addComment(1, 'Hello World!', 'admin')

module.exports = {
    userDB,
    postDB
};
