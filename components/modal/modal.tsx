'use client';

import classes from './modal.module.css';

type ModalProps = {
    isOpen: boolean;
    message: string;
    title: string
    onClose: () => void;
}
// { isOpen, title, message, onClose }: ModalProps
export default function Modal() {

    const isOpen = true;
    const title = 'Un error occurred:'
    const message = 'Something happens!';
    const onClose = () => console.log('closed');
   
    
    if (!isOpen) return null;

    return (
        <div className={classes.modal}>
            <div className={classes['modal-content']}>
                <span className={classes.close} onClick={onClose}>&times;</span>
                <h3>{title}</h3>
                <p>{message}</p>
            </div>
        </div>
    );
};

