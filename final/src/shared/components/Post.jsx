import { useState } from 'react';

import { fetchCreateComment, fetchDeleteUserPost } from '../../api';
import getTimeSincePost from '../utils/getTimeSincePost';
import Comment from './Comment';

import { useStore } from '../../store/Store';

function Post({ post }) {
    const { state, dispatch } = useStore();
    const { userDetails } = state;
    const [displayedImageIndex, setDisplayedImageIndex] = useState(0);
    const [content, setContent] = useState('');
    const [replyTo, setReplyTo] = useState(post.creator);

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

    const handleDelete = async () => {
        dispatch({
            type: 'call_api',
        });
        fetchDeleteUserPost(post.id)
            .then(
                dispatch({
                    type: 'delete_post_success',
                })
            )
            .catch((error) => {
                dispatch({
                    type: 'error',
                    data: 'Delete post error: ' + error.error,
                });
            });
    };

    const isCurrentUserPost = post.creator === userDetails;

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({
            type: 'call_api',
        });

        if (!userDetails) {
            dispatch({
                type: 'create_post_without_login',
            });
            return;
        }

        fetchCreateComment(post.id, '@' + replyTo + ' ' + content)
            .then((response) => {
                setContent('');
                setReplyTo(post.creator);
                dispatch({
                    type: 'create_comment_success',
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'error',
                    data: 'Create comment error: ' + error.error,
                });
            });
    };

    return (
        <>
            <div className='post'>
                <div className='post-header'>
                    <div className='post-header-text'>
                        <h3 className='post-user'>
                            {post.creator}{' '}
                            <span
                                className='post-time'
                                title={new Date(
                                    post.createdAt
                                ).toLocaleString()}
                            >
                                • {getTimeSincePost(post.createdAt)}
                            </span>
                        </h3>
                    </div>
                    {isCurrentUserPost && (
                        <button
                            className='delete-post-button'
                            onClick={handleDelete}
                            title='Delete Post'
                        >
                            <i className='gg-close'></i>
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
                            src={`http://localhost:4000/uploads/${post.images[displayedImageIndex]}`}
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
                    {post.tags.split(' ').map((tag, index) => (
                        <span key={index} className='post-tag'>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className='post-comment-button'>
                    <button
                        className='comment-reply-button'
                        onClick={() => setContent('@' + post.creator + ' ')}
                    >
                        Reply
                    </button>
                </div>
                <Comment
                    comments={post.comments}
                    setReplyTo={setReplyTo}
                    setContent={setContent}
                />
                <form onSubmit={handleSubmit} className='comment-form'>
                    <input
                        type='text'
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        placeholder={`Reply to ${replyTo}...`}
                        required
                    />
                    {content ? <button type='submit'>Comment</button> : ''}
                </form>
                <hr className='separator' />
            </div>
        </>
    );
}

export default Post;
