'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type ProviderProps = {
    children: ReactNode;
}

export default function SessionProviderWrapper({ children }: ProviderProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>);
}
