'use client';

import { useFormStatus } from 'react-dom';

import Loader from '@/components/ui/loader';
import classes from './submit-btn.module.css';

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <div className={classes.actions}>
            <Loader isSending={pending} />
            <button type="submit" disabled={pending}>
                {pending ? 'Sending...' : 'Add Adventure'}
            </button>
        </div>
    );
};

