import { useState } from 'react';

import posts from '../../assets/posts';
import Post from '../../shared/components/Post';

function MyPost({ loggedIn, username }) {
    const [displayedPosts, setDisplayedPosts] = useState(3);

    const handleShowMore = () => {
        setDisplayedPosts(displayedPosts + 3);
    };

    const endOfPosts = displayedPosts >= posts.length;

    return (
        <main>
            {loggedIn &&
                posts.slice(0, displayedPosts).map((post, index) => {
                    if (post.user === username) {
                        return (
                            <Post post={post} key={index} username={username} />
                        );
                    }
                    return '';
                })}
            {!endOfPosts && loggedIn && (
                <button
                    className='display-more-button'
                    onClick={handleShowMore}
                >
                    Display More
                </button>
            )}
            {endOfPosts && loggedIn && <p>End of the World 👽</p>}
            {!loggedIn && <p>Please login to view your posts</p>}
        </main>
    );
}

export default MyPost;
