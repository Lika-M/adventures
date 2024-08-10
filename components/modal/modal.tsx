'use client';

import classes from './modal.module.css';

type ModalProps = {
    isOpen: boolean;
    title: string,
    message: string;
    onClose: () => void;
}

export default function Modal({ isOpen, title, message, onClose }: ModalProps) {
 
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

