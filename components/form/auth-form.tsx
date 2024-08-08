'use client'
import { useState } from "react";

import classes from './auth-form.module.css';
import { useFormStatus } from "react-dom";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const { pending } = useFormStatus();

    function toggleAction() {
        setIsLogin(state => !state);
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form>
                <div className={classes.control}>
                    <label htmlFor='email'>Enter your email</label>
                    <input
                        type='email'
                        id='email'
                    />
                    {<p className={classes.error}>ERROR</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Enter your password</label>
                    <input
                        type='password'
                        id='password'
                    />
                    {<p className={classes.error}>ERROR</p>}
                </div>
                <div className={classes.actions}>
                    <button type='submit' disabled={pending}>
                        {pending ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
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