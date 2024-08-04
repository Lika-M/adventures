'use client';

import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

import { createAdventure } from '@/app/actions';
import SubmitButton from './submit-btn';
import classes from './new-adventure-form.module.css';

export default function NewAdventureForm() {
    const router = useRouter();

    let initialState = {
        success: false,
        message: '',
        errors: {
            title: '',
            image: '',
            address: '',
            description: ''
        }
    }
    const [state, formAction] = useFormState(createAdventure, initialState);

    if (state.success === true) {
        router.push('/adventures');
    }

    return (
        <div className={classes.wrapper}>
            <form className={classes.form} action={formAction}>
                <div className={classes.control}>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                    />
                    {state.errors.title && <p className={classes.error}>{state.errors.title}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"
                    />
                    {state.errors.image && <p className={classes.error}>{state.errors.image}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                    />
                    {state.errors.address && <p className={classes.error}>{state.errors.address}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        name='description'
                        rows={5}
                    ></textarea>
                    {state.errors.description && <p className={classes.error}>{state.errors.description}</p>}
                </div>
                <SubmitButton />
            </form>
        </div>
    );
}
