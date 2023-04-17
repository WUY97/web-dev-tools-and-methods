class Post {
    static lastId = 0;
    constructor(title, content, images, tags, creator) {
        this.id = ++Post.lastId;
        this.title = title;
        this.content = content;
        this.images = images;
        this.tags = tags;
        this.creator = creator;
        this.createdAt = new Date();
        this.comments = [];
    }
}

class Comment {
    static lastId = 0;
    constructor(postId, content, creator) {
        this.id = ++Comment.lastId;
        this.postId = postId;
        this.content = content;
        this.creator = creator;
        this.createdAt = new Date();
    }
}

class Posts {
    constructor() {
        this.posts = {};
    }

    createPost(title, content, images, tags, creator) {
        const newPost = new Post(title, content, images, tags, creator);
        this.posts[newPost.id] = newPost;
        return newPost;
    }

    getPostById(postId) {
        return this.posts[postId];
    }

    getPostsByUsername(username) {
        return Object.values(this.posts).filter(
            (post) => post.creator === username
        );
    }

    getPostCreator(postId) {
        const post = this.getPostById(postId);
        if (!post) {
            return null;
        }

        return post.creator;
    }

    getAllPosts() {
        return Object.values(this.posts);
    }

    deletePost(username, postId) {
        const userPosts = this.getPostsByUsername(username);
        if (!userPosts) {
            return false;
        }

        for (let key in this.posts) {
            if (this.posts[key].id.toString() === postId) {
                delete this.posts[key];
                return true;
            }
        }

        return false;
    }

    addComment(postId, content, creator) {
        const post = this.getPostById(postId);
        if (!post) {
            return false;
        }

        const comment = new Comment(postId, content, creator);
        post.comments.push(comment);
        return comment;
    }

    getCommentsByPostId(postId) {
        const post = this.getPostById(postId);
        if (!post) {
            return false;
        }

        return post.comments;
    }
}

module.exports = Posts;
