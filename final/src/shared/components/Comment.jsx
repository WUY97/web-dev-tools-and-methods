function Comment({ comments, setReplyTo }) {
    return (
        <>
            {comments.length !== 0 ? (
                <div className='comment-container'>
                    {comments.map((comment) => (
                        <div className='comment' key={comment.id}>
                            <div className='comment-content'>
                                <span className='comment-creator'>
                                    {comment.creator}:{' '}
                                </span>
                                <span className='comment-content'>
                                    {comment.content}
                                </span>
                                <button
                                    className='comment-reply-button'
                                    title={comment.creator}
                                    onClick={() => {
                                        setReplyTo(comment.creator);
                                    }}
                                >
                                    Reply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No comments yet.</p>
            )}
        </>
    );
}

export default Comment;
