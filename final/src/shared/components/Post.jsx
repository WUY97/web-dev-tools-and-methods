import { useState } from 'react';

import getTimeSincePost from '../utils/getTimeSincePost';

function Post({ post, username }) {
    const [displayedImageIndex, setDisplayedImageIndex] = useState(0);

    const handlePrevImage = () => {
        if (displayedImageIndex > 0) {
            setDisplayedImageIndex(displayedImageIndex - 1);
        } else {
            setDisplayedImageIndex(post.images.length - 1);
        }
    };

    const handleNextImage = () => {
        if (displayedImageIndex < post.images.length - 1) {
            setDisplayedImageIndex(displayedImageIndex + 1);
        } else {
            setDisplayedImageIndex(0);
        }
    };

    const handleDelete = () => {
        console.log('delete post' + post.id);
    };

    const isCurrentUserPost = post.user === username;

    return (
        <>
            <div className='post'>
                <div className='post-header'>
                    <img
                        className='user-avatar'
                        src={`https://picsum.photos/seed/${post.user}/32`}
                        alt={post.user}
                    />
                    <div className='post-header-text'>
                        <h3 className='post-user'>
                            {post.user}{' '}
                            <span
                                className='post-time'
                                title={new Date(
                                    post.createTime
                                ).toLocaleString()}
                            >
                                • {getTimeSincePost(post.createTime)}
                            </span>
                        </h3>
                    </div>
                    {isCurrentUserPost && (
                        <button
                            className='delete-post-button'
                            onClick={handleDelete}
                            title='Delete Post'
                        >
                            <i class='gg-close'></i>
                        </button>
                    )}
                </div>
                <div className='post-content'>
                    <h2 className='post-title'>{post.title}</h2>
                    <p className='post-text'>{post.content}</p>
                    <div className='post-images'>
                        {post.images.length > 1 && displayedImageIndex > 0 && (
                            <button
                                className='prev-image-button'
                                onClick={handlePrevImage}
                            >
                                <i className='gg-arrow-left-o'></i>
                            </button>
                        )}
                        <img
                            src={post.images[displayedImageIndex]}
                            alt={`post-${post.id}-${displayedImageIndex}`}
                        />
                        {post.images.length > 1 &&
                            displayedImageIndex < post.images.length - 1 && (
                                <button
                                    className='next-image-button'
                                    onClick={handleNextImage}
                                >
                                    <i className='gg-arrow-right-o'></i>
                                </button>
                            )}
                    </div>
                </div>
                <div className='post-tags'>
                    {post.tags.map((tag, index) => (
                        <span key={index} className='post-tag'>
                            # {tag}
                        </span>
                    ))}
                </div>
                {post.comments.length > 0 && (
                    <div className='post-comments'>
                        {post.comments.map((comment, index) => (
                            <div key={index} className='post-comment'>
                                <img
                                    className='comment-avatar'
                                    src={`https://picsum.photos/seed/${comment.userId}/32`}
                                    alt={comment.userId}
                                />
                                <p className='comment-text'>
                                    {comment.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <hr className='separator' />
            </div>
        </>
    );
}

export default Post;
