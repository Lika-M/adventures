'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

import ActiveLink from '@/components/ui/active-link';
import classes from './main-navigation.module.css';

export default function MainNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <ActiveLink href='/'>
                    <h3>Adventures</h3>
                </ActiveLink>
                <Image
                    src='/logo.png'
                    width={150}
                    height={120}
                    quality={75}
                    priority
                    alt={'Logo'}
                />
            </div>
            <nav className={`${classes.nav} ${mobileMenuOpen ? classes['open-nav'] : classes['close-nav']}`}>
                <div className={classes.menuToggle} onClick={toggleMobileMenu}>
                    <div className={classes.toggleIcon}>
                        {!mobileMenuOpen ? <FaBars /> : <FaTimes />}
                    </div>
                </div>
                <ul>
                    <li className={classes['new-adventure']}>
                        <ActiveLink href='/new-adventure'>Add Journey</ActiveLink>
                    </li>
                    <li>
                        <ActiveLink href='/adventures'>All Impressive Places</ActiveLink>
                    </li>
                    <li className={classes['auth-link']}>
                        <ActiveLink href='/auth'>Login</ActiveLink>
                    </li>
                    <li className={classes['auth-link']}>
                        <button className='active'>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
