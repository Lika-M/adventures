import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require('bcrypt');

import { findUser } from '@/lib/mongodb';

export const authOptions = {
    session: {
        strategy: "jwt" as const
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await findUser('users', credentials?.email as string);
            
                if (!user) {
                    throw new Error('Unauthorize!');
                }

                const verifyPassword = await bcrypt.compare(credentials?.password, user.password);

                if (!verifyPassword) {
                    throw new Error('Invalid password.');
                }

                return {
                    id:user.id,
                    email: user.email,
                    name: null,
                    image: null
                };
            }
        })
    ]
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);