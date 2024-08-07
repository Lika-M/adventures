'use client';

import { useEffect } from 'react';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="error">
                <h2>
                    Something went wrong!
                    <br />
                    An error occurred.
                </h2>
            <p>{error.message}</p>
            <button
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    );
}
