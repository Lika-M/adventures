'use client';

import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Loader from '@/components/ui/loader';
import classes from './submit-btn.module.css';

export default function SubmitButton() {
    const { pending } = useFormStatus();
    const router = useRouter();

    const { data: session, status } = useSession();
    const isAuth = status === 'authenticated';

    return (
        <div className={classes.actions}>
            <Loader isSending={pending} />
            {!pending && (<div>
                <span>Not authenticated? </span>
                <span className={classes.signIn} onClick={()=> router.push('/auth')}>
                    Click here.
                </span>
            </div>)}
            <button type="submit" disabled={pending || !isAuth}>
                {pending ? 'Sending...' : 'Add Adventure'}
            </button>
        </div>
    );
};

