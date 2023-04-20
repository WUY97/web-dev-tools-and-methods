import { useState } from 'react';

import { fetchCreatePost } from '../../api';
import renderErrorMessage from '../../shared/utils/renderErrorMessage';

import { useStore } from '../../store/Store';

function CreatePost() {
    const { state, dispatch } = useStore();
    const { showSuccessMessage } = state;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({
            type: 'call_api',
        });
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
                dispatch({
                    type: 'create_post_success',
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'create_post_fail',
                    data:
                        'Create post error: ' + renderErrorMessage(error.error),
                });
            });
    };

    const handleAddAnotherPost = () => {
        setTitle('');
        setContent('');
        setTags('');
        dispatch({
            type: 'create_another_post',
        });
    };

    const handleCheckOutYourPost = () => {
        dispatch({
            type: 'from_create_post_to_my_post',
        });
    };

    const handleClose = () => {
        setTitle('');
        setContent('');
        setTags('');
        setImages([]);
        dispatch({
            type: 'close_create_post',
        });
    };

    const handleImageUpload = (event) => {
        event.preventDefault();
        const files = Array.from(event.target.files);
        if (files.length > 5) {
            alert('You can only upload up to 5 images');
            return;
        }

        for (let file of files) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size cannot exceed 5 MB');
                return;
            }
        }

        setImages(files);
    };

    return (
        <div className='modal'>
            <div className='modal-content'>
                {showSuccessMessage ? (
                    <div className='post-success-message'>
                        <h2>Post created successfully!</h2>
                        <div className='success-following-options'>
                            <button
                                className='filled-button'
                                onClick={handleAddAnotherPost}
                            >
                                Add Another Post
                            </button>
                            <button
                                className='filled-button'
                                onClick={handleCheckOutYourPost}
                            >
                                Check Out Your Post
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='modal-header'>
                            <h1>Create a Post</h1>
                            <button
                                className='modal-close-button'
                                onClick={handleClose}
                            >
                                <i className='gg-close'></i>
                            </button>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className='create-post-form'
                        >
                            <div className='create-post-form-item'>
                                <label htmlFor='title'>Title*</label>
                                <input
                                    type='text'
                                    id='title'
                                    title='Title must be between 1 and 50 characters'
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                    required
                                    maxLength={50}
                                />
                            </div>
                            <div className='create-post-form-item'>
                                <label htmlFor='content'>Content*</label>
                                <textarea
                                    id='content'
                                    value={content}
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                    title='Content must be between 1 and 150 characters'
                                    required
                                    maxLength={150}
                                ></textarea>
                            </div>
                            <div className='create-post-form-item'>
                                <label htmlFor='tags'>Tags*</label>
                                <input
                                    type='text'
                                    id='tags'
                                    value={tags}
                                    title="Tags must be between 1 and 5, start with '#' and separated by spaces"
                                    placeholder='#tag1 #tag2 #tag3 #tag4 #tag5'
                                    onChange={(e) => {
                                        setTags(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className='create-post-form-item'>
                                <label htmlFor='images'>Images*</label>
                                <input
                                    type='file'
                                    id='images'
                                    title='Images must be less than 5MB and less than 5 images'
                                    className='image-upload'
                                    accept='image/jpeg, image/png'
                                    onChange={handleImageUpload}
                                    multiple
                                    required
                                    limits={{ maxFileSize: 5 * 1024 * 1024 }}
                                />
                            </div>
                            <button className='filled-button' type='submit'>
                                Create Post
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default CreatePost;
