import { useState, useEffect } from 'react';

import Post from '../../shared/components/Post';
import Pagination from '../../shared/components/Pagination';

import { fetchUserPosts } from '../../api';
import sortPostsByDate from '../../shared/utils/sortPostsByDate';

import { useStore } from '../../store/Store';

function MyPost() {
    const { state } = useStore();
    const { userDetails } = state;
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

    useEffect(() => {
        fetchUserPosts(userDetails)
            .then((response) => {
                setPosts(Object.values(response));
            })
            .catch((error) => {
                setPosts([]);
            });
    }, [userDetails]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts
        .sort(sortPostsByDate)
        .slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <main>
            {posts.length === 0 ? (
                <p className='welcome-message'>Write your first post👾</p>
            ) : (
                <>
                    {currentPosts.map((post, index) => (
                        <Post post={post} key={index} />
                    ))}
                    <Pagination
                        totalPosts={posts.length}
                        paginate={paginate}
                        postsPerPage={postsPerPage}
                        currentPage={currentPage}
                    />
                </>
            )}
        </main>
    );
}

export default MyPost;
