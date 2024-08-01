'use client';

import { useFormState } from 'react-dom';

import { createAdventure } from '@/app/actions';
import classes from './new-adventure-form.module.css';

export default function NewAdventureForm() {
    const [state, formAction] = useFormState(createAdventure, {
        success: false,
        message: '',
        errors: []
    });

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
                </div>
                <div className={classes.control}>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        name='description'
                        rows={5}
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    <button disabled={false}>Add Adventure</button>
                </div>
            </form>
        </div>
    );
}
