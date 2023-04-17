import { useState, useEffect } from 'react';
import Post from '../../shared/components/Post';
// import posts from '../../assets/posts';

import { fetchAllPosts } from '../../shared/utils/services';

function Home({ username }) {
    const [posts, setPosts] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState(3);
    const [endOfPosts, setEndOfPosts] = useState(false);

    const handleShowMore = () => {
        setDisplayedPosts(displayedPosts + 3);
    };

    useEffect(() => {
        fetchAllPosts()
            .then((response) => {
                setPosts(Object.values(response));
            })
            .catch((error) => {
                setPosts([]);
            });
    }, [posts]);

    useEffect(() => {
        setEndOfPosts(displayedPosts >= posts.length);
    }, [displayedPosts, posts]);

    return (
        <main>
            {posts.length === 0 ? (
                <p>There are no posts yet</p>
            ) : (
                <>
                    {posts
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, displayedPosts)
                        .map((post, index) => (
                            <Post post={post} key={index} username={username} />
                        ))}
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

export default Home;
