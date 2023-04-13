class Post {
    static lastId = 0;
    constructor(title, content, imageUrls, tags, creator) {
        this.id = ++Post.lastId;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrls;
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

    createPost(title, content, imageUrls, tags, creator) {
        const newPost = new Post(
            title,
            content,
            imageUrls,
            tags,
            creator,
        );
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

    getAllPosts() {
        return Object.values(this.posts);
    }

    deletePost(user, postId) {
        const userPosts = this.getPostsByUsername(user.username);
        if (!userPosts) {
            return false;
        }

        const index = userPosts.findIndex((post) => post.id === postId);

        if (index === -1) {
            return false;
        }

        userPosts.splice(index, 1);
        return true;
    }

    addComment(postId, content, creator, createdAt) {
        const post = this.getPostById(postId);
        if (!post) {
            return false;
        }

        const comment = new Comment(postId, content, creator, createdAt);

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
