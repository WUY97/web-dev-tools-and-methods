import { useState } from 'react';

import Error from '../../shared/components/Error';
import { fetchCreatePost } from '../../shared/utils/services';
import renderErrorMessage from '../../shared/utils/renderErrorMessage';

function CreatePost({
    setShowCreatePost,
    setPage,
}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', tags);
        for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]);
        }

        fetchCreatePost(formData)
            .then((response) => {
                setTitle('');
                setContent('');
                setTags('');
                setImages([]);
                setErrorMessage('');
                setShowSuccessMessage(true);
            })
            .catch((error) => {
                setShowSuccessMessage(false);
                setErrorMessage(error.error);
            });
    };

    const handleAddAnotherPost = () => {
        setTitle('');
        setContent('');
        setTags('');
        setImages([]);
        setErrorMessage('');
        setShowSuccessMessage(false);
    };

    const handleCheckOutYourPost = () => {
        setPage('MyPost');
        setShowSuccessMessage(false);
        setShowCreatePost(false);
    };

    const handleClose = () => {
        setTitle('');
        setContent('');
        setTags('');
        setImages([]);
        setShowCreatePost(false);
    };

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h1>Create a Post</h1>
                    <button
                        className='modal-close-button'
                        onClick={handleClose}
                    >
                        <i className='gg-close'></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='title'>Title:</label>
                        <input
                            type='text'
                            id='title'
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='content'>Content:</label>
                        <textarea
                            id='content'
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor='tags'>Tags:</label>
                        <textarea
                            type='text'
                            id='tags'
                            value={tags}
                            onChange={(e) => {
                                setTags(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor='images'>Images:</label>
                        <input
                            type='file'
                            id='images'
                            onChange={(e) => {
                                setImages(Array.from(e.target.files));
                            }}
                            multiple
                        />
                    </div>
                    {errorMessage && <Error errorMessage={errorMessage} />}
                    <button type='submit'>Create Post</button>
                </form>
                {showSuccessMessage && (
                    <div>
                        <p>Post created successfully!</p>
                        <button onClick={handleAddAnotherPost}>
                            Add Another Post
                        </button>
                        <button onClick={handleCheckOutYourPost}>
                            Check Out Your Post
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreatePost;
