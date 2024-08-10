'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { createUser } from '@/lib/util';

import { type User, type UserData } from '@/types'
import classes from './auth-form.module.css';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<UserData>({ email: '', password: '' });
    const router = useRouter();

    async function signHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage(prev => ({
                ...prev,
                email: 'Invalid email address.'
            }));
            return;
        }

        if (!password || password.trim().length < 6) {
            setErrorMessage(prev => ({
                ...prev,
                password: 'Password must be at least 6 characters long.'
            }));
            return;
        }

        const user: User = {
            email,
            password,
            createdAt: new Date().toISOString()
        };

        try {
            setIsLoading(true);

            if (isLogin) {
                const result = await signIn('credentials', {
                    email: email,
                    password: password,
                    redirect: false
                });

                if (result?.error) {
                    alert(result.error);

                    setEmail('');
                    setPassword('');
                } else {
                    router.replace('/adventures');
                }

            } else {
                const result = await createUser(user);

                if (result.status === 422 || result.status === 401) {
                    alert(result.message);

                    setEmail('');
                    setPassword('');

                } else if (result.status === 500) {
                    throw new Error(result.message);

                } else {
                    router.replace('/');
                }
            }
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message); 

        } finally {
            setIsLoading(false);
        }
    }

    function toggleAction() {
        setIsLogin(state => !state);
        setEmail('');
        setPassword('');
        setErrorMessage({ email: '', password: '' });
    }

    function handleEmailFocus() {
        setEmail('');
        setErrorMessage(state => ({ ...state, email: '' }));
    }

    function handlePasswordFocus() {
        setPassword('');
        setErrorMessage(state => ({ ...state, password: '' }));
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={signHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Enter your email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        onFocus={handleEmailFocus}
                    />
                    {errorMessage.email && <p className={classes.error}>{errorMessage.email}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Enter your password</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        onFocus={handlePasswordFocus}
                    />
                    {errorMessage.password && <p className={classes.error}>{errorMessage.password}</p>}
                </div>
                <div className={classes.actions}>
                    <button type='submit' disabled={isLoading}>
                        {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
                    </button>
                </div>
                <div className={classes.toggle}>
                    <span>
                        {isLogin ? 'Not have an account?' : 'Already have an account?'}
                    </span>
                    <span onClick={toggleAction}>
                        {isLogin ? 'Register here.' : 'Login here.'}
                    </span>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
