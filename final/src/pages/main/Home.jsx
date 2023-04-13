import { useState } from 'react';

import Post from '../../shared/components/Post';
import posts from '../../assets/posts';

function Home({ username }) {
    const [displayedPosts, setDisplayedPosts] = useState(3);

    const handleShowMore = () => {
        setDisplayedPosts(displayedPosts + 3);
    };

    const endOfPosts = displayedPosts >= posts.length;

    return (
        <main>
            {posts.slice(0, displayedPosts).map((post, index) => (
                <Post post={post} key={index} username={username} />
            ))}
            {!endOfPosts && (
                <button className='display-more-button' onClick={handleShowMore}>Display More</button>
            )}
            {endOfPosts && <p>End of the World 👽</p>}
        </main>
    );
}

export default Home;
