'use client';
import { ReactNode } from 'react';
import { usePathname  } from 'next/navigation';
import Link from 'next/link';

import classes from './active-link.module.css';

type ActiveLinkProps = {
    href: string;
    children: ReactNode;
};

export default function ActiveLink({ href, children }: ActiveLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className={isActive ? classes.active : ''}>
            {children}
        </Link>
    );
};