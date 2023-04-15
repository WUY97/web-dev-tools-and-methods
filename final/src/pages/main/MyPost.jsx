import { useState } from 'react';

import posts from '../../assets/posts';
import Post from '../../shared/components/Post';

function MyPost({ username }) {
    const [displayedPosts, setDisplayedPosts] = useState(3);

    const handleShowMore = () => {
        setDisplayedPosts(displayedPosts + 3);
    };

    const length = posts.filter((post) => post.user === username).length;

    const endOfPosts = displayedPosts >= length;

    return (
        <main>
            {length === 0 ? (
                <p>There are no posts yet</p>
            ) : (
                <>
                    {posts.slice(0, displayedPosts).map((post, index) => {
                        if (post.user === username) {
                            return (
                                <Post
                                    post={post}
                                    key={index}
                                    username={username}
                                />
                            );
                        }
                        return '';
                    })}
                    {endOfPosts ? (
                        <p>End of the World 👽</p>
                    ) : (
                        <button
                            className='display-more-button'
                            onClick={handleShowMore}
                        >
                            Display More
                        </button>
                    )}
                </>
            )}
        </main>
    );
}

export default MyPost;
