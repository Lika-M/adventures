'use client';
import { useState, useEffect, FocusEvent } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { createAdventure } from '@/actions/create-adventure';
import SubmitButton from './submit-btn';
import Modal from '@/components/modal/modal';
import classes from './new-adventure-form.module.css';

export default function NewAdventureForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputErrors, setInputErrors] = useState({
        title: '',
        image: '',
        address: '',
        description: '',
        user: ''
    });

    let initialState = {
        success: false,
        message: '',
        errors: inputErrors
    }

    const [state, formAction] = useFormState(createAdventure, initialState);

    useEffect(() => {
        if (state.errors.user) {
            setIsModalOpen(true);
        } else {
            setInputErrors(state.errors);
        }
    }, [state.errors])

    if (state.success) {
        router.push('/adventures');
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleFocus(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name } = event.target as HTMLInputElement | HTMLTextAreaElement;
        if (name) {
            setInputErrors(prevState => ({
                ...prevState,
                [name]: ''
            }));
        }
    }

    const header = session?.user
        ? (<header>
            <span>Welcome back, </span>
            <span>{session?.user.email}!</span>
        </header>)
        : (<header>
            <span>
                Sign in to create and share your own adventure.
            </span>
        </header>)

    return (
        <section className={classes.wrapper}>
            {header}
            <form className={classes.form} action={formAction}>
                <div className={classes.control}>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        onFocus={handleFocus}
                    />
                    {inputErrors.title && <p className={classes.error}>{inputErrors.title}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"
                        onFocus={handleFocus}
                    />
                    {inputErrors.image && <p className={classes.error}>{inputErrors.image}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        onFocus={handleFocus}
                    />
                    {inputErrors.address && <p className={classes.error}>{inputErrors.address}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        name='description'
                        rows={5}
                        onFocus={handleFocus}
                    ></textarea>
                    {inputErrors.description && <p className={classes.error}>{inputErrors.description}</p>}
                </div>
                <SubmitButton />
            </form>
            {isModalOpen &&
                <Modal isOpen={isModalOpen}
                    title={'Authentication required.'}
                    message={inputErrors.user}
                    onClose={closeModal}
                />}
        </section>
    );
}
