import React from 'react';

import posts from '../../assets/posts';
import Post from '../../shared/components/Post';

function MyPost({ loggedIn, username }) {
    return (
        <>
            {loggedIn
                ? posts.map((post, index) => {
                        if (post.username === username) {
                            return (
                                <Post
                                    post={post}
                                    key={index}
                                    username={username}
                                />
                            );
                        }
                        return '';
                    })
                : <p>Please login to view your posts</p>}
        </>
    );
}

export default MyPost;
