import { type User } from '@/types';

export async function createUser(userData: User) {
    const response = await fetch('/api/auth/register', {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (!response.ok) {
        return {
            status: response.status,
            message: data.message || 'User registration failed.'
        }
    }

    return {
        status: response.status,
        data
    };
}
