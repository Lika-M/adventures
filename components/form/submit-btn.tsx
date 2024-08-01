'use client';

import { useFormStatus } from 'react-dom';

import classes from './submit-btn.module.css';

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <div className={classes.actions}>
            <button type="submit" disabled={pending}>
                {pending ? 'Submitting...' : 'Add Adventure'}
            </button>
        </div>
    );
};

