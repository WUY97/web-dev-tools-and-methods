import { useState } from 'react';

function Modal({ props }) {
    const [showModal, setShowModal] = useState(true);

    function handleCloseModal() {
        setShowModal(false);
    }
    
    return (
        <>
            {showModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <button
                            className='modal-close-button'
                            onClick={handleCloseModal}
                        >
                            <i class='gg-close'></i>
                        </button>
                        <h2>{props.title}</h2>
                        <div>{props.content}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
