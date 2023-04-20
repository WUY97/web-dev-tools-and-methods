import { useState, useEffect } from 'react';

import Post from '../../shared/components/Post';
import Pagination from '../../shared/components/Pagination';

import { fetchUserPosts } from '../../shared/utils/services';
import sortPostsByDate from '../../shared/utils/sortPostsByDate';

function MyPost({ username }) {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

    useEffect(() => {
        fetchUserPosts(username)
            .then((response) => {
                setPosts(Object.values(response));
            })
            .catch((error) => {
                setPosts([]);
            });
    }, [username]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts
        .sort(sortPostsByDate)
        .slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <main>
            {posts.length === 0 ? (
                <p>Write your first post</p>
            ) : (
                <>
                    {currentPosts.map((post, index) => (
                        <Post post={post} key={index} username={username} />
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
