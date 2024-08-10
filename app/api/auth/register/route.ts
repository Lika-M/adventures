const bcrypt = require('bcrypt');

import { type User } from '@/types';
import { findUser, insertDocument } from '@/lib/mongodb';

export async function POST(req: Request): Promise<Response> {
    const { email, password } = await req.json();

    // Проверка дали вече съществува потребител с този имейл
    const existingUser = await findUser('users', email);
    
    if (existingUser) {
        return new Response(JSON.stringify({ message: 'Registration with this email already exists.' }), {
            status: 422,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Валидиране на данните
    const isValid = email && email.includes('@') && password && password.trim().length > 5;
    if (!isValid) {
        return new Response(JSON.stringify({ message: 'Invalid user data.' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Хеширане на паролата
        const hashedPassword = await bcrypt.hash(password, 12);

        if(!hashedPassword){
            return new Response(JSON.stringify({ message: 'Something wrong happens, try again.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Подготовка на данните за потребителя
        const userData: User = {
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        // Вмъкване на потребителя в базата данни
        const result = await insertDocument('users', userData);

        if (!result) {
            return new Response(JSON.stringify({ message: 'User registration failed.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Успешно създаване на потребителя
        return new Response(JSON.stringify({ message: 'User created.', data: result }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        // Обработка на други грешки
        return new Response(JSON.stringify({ message: 'User registration failed.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}