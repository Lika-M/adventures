'use client';

import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

import Loader from '@/components/ui/loader';
import classes from './submit-btn.module.css';

export default function SubmitButton() {
    const { pending } = useFormStatus();
    const router = useRouter();

    return (
        <div className={classes.actions}>
            <Loader isSending={pending} />
            {!pending && (<div>
                <span>Not authenticated? </span>
                <span className={classes.signIn} onClick={()=> router.push('/auth')}>
                    Click here.
                </span>
            </div>)}
            <button type="submit" disabled={pending}>
                {pending ? 'Sending...' : 'Add Adventure'}
            </button>
        </div>
    );
};

