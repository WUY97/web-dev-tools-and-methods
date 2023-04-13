import { useState } from 'react';

import Error from '../../shared/components/Error';
import { fetchCreatePost } from '../../shared/utils/services';
import renderErrorMessage from '../../shared/utils/renderErrorMessage';

function CreatePost({
    onCreatePost,
    showCreatePost,
    setShowCreatePost,
    username,
}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);
    const [user, setUser] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setImages([...images, ...files]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const content = event.target.content.value;
        const tags = event.target.tags.value
            .split(/[\r\n]+/)
            .map((tag) => tag.trim());
        const images = event.target.images.files;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        for (let i = 0; i < tags.length; i++) {
            formData.append('tags', tags[i]);
        }
        for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]);
        }

        fetchCreatePost(formData)
            .then((response) => {
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
        setUser('');
        setShowSuccessMessage(false);
    };

    const handleCheckOutYourPost = () => {};

    const handleClose = () => {
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
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='content'>Content:</label>
                        <textarea
                            id='content'
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor='tags'>Tags:</label>
                        <textarea
                            type='text'
                            id='tags'
                            value={tags}
                            onChange={(event) => setTags(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='images'>Images:</label>
                        <input
                            type='file'
                            id='images'
                            onChange={handleImageChange}
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
