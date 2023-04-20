import { useState, useEffect, useRef } from 'react';

import Post from '../../shared/components/Post';

import useInterval from '../../shared/utils/useInterval';
import { fetchAllPosts } from '../../shared/utils/services';
import sortPostsByDate from '../../shared/utils/sortPostsByDate';

function Home({ username, loggedIn, setErrorMessage }) {
    const [posts, setPosts] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState(5);
    const [endOfPosts, setEndOfPosts] = useState(false);
    const [newPost, setNewPost] = useState(false);
    const newPostsRef = useRef([]);
    const [firstLoad, setFirstLoad] = useState(true);

    const handleShowMore = () => {
        setDisplayedPosts(displayedPosts + 5);
    };

    const handleRefresh = () => {
        setPosts(newPostsRef.current);
        setNewPost(false);
    };

    useInterval(() => {
        fetchAllPosts()
            .then((response) => {
                const newPosts = Object.values(response);
                newPostsRef.current = newPosts;
                if (newPosts.length > posts.length) {
                    setNewPost(true);
                }
            })
            .catch((error) => {
                setNewPost(false);
                setPosts([]);
                console.log(error);
            });
    }, 1000 * 10);

    useEffect(() => {
        if (firstLoad) {
            fetchAllPosts()
                .then((response) => {
                    setPosts(Object.values(response));
                    setFirstLoad(false);
                    
                })
                .catch((error) => {
                    setNewPost(false);
                    setPosts([]);
                    console.log(error);
                });
        }
    }, [firstLoad]);

    useEffect(() => {
        setEndOfPosts(displayedPosts >= posts.length);
    }, [displayedPosts, posts]);

    return (
        <main>
            {newPost && (
                <div className='new-post-notification'>
                    A new component is available.{' '}
                    <button className='text-button' onClick={handleRefresh}>
                        Refresh
                    </button>
                </div>
            )}
            <>
                {posts
                    .sort(sortPostsByDate)
                    .slice(0, displayedPosts)
                    .map((post, index) => (
                        <Post post={post} key={index} username={username} setErrorMessage={setErrorMessage} />
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
        </main>
    );
}

export default Home;
