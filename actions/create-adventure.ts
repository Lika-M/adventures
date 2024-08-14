'use server';
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { uploadImage } from "@/lib/cloudinary";
import { insertDocument } from '@/lib/mongodb';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type FormState = {
    success: boolean,
    message: string,
    errors: {
        title: string;
        image: string;
        address: string;
        description: string;
        user: string 
    }
}

export async function createAdventure(prevState: FormState, formData: FormData) {
    const session = await getServerSession(authOptions);

    const title = formData.get('title') as string;
    const image = formData.get('image') as File;
    const address = formData.get('address') as string;
    const description = formData.get('description') as string;

    let errors: FormState['errors'] = {
        title: '',
        image: '',
        address: '',
        description: '',
        user: ''
    };

    let hasErrors = false;

    if (!title || title === '') {
        errors.title = 'Title is required!';
        hasErrors = true;
    }

    if (image.size === 0 || image.name === undefined) {
        errors.image = 'Image is required!';
        hasErrors = true;
    }

    if (!address || address === '') {
        errors.address = 'Address is required!';
        hasErrors = true;
    }

    if (!description || description === '') {
        errors.description = 'Description is required!';
        hasErrors = true;
    }

    if (!session || !session.user) {
        errors.user = 'Please sign in to continue.';
        hasErrors = true;
    }

    if (hasErrors) {
        return {
            success: false,
            message: 'Invalid data.',
            errors: errors
        };
    }

    // upload image into Claudinary

    let imgURL: string = '';

    try {
        if (image) {
            const arrayBuffer = await image.arrayBuffer();
            const base64String = Buffer.from(arrayBuffer).toString('base64');
            const fileUri = `data:${image.type};base64,${base64String}`;

            const result = await uploadImage(fileUri);
            imgURL = result;
        }

        if (!imgURL) {
            throw new Error('Failed to upload image, URL not received.');
        }

    } catch (error: any) {
        errors.image = 'Image uploading fails!';

        return {
            success: false,
            message: error.message,
            errors: errors
        };
    }

    // Store data in the DB
    const userEmail = session?.user?.email;
   
    const adventure = {
        title,
        image: imgURL,
        address,
        description,
        creator: userEmail,
        createdAt: new Date().toISOString()
    }

    try {
        await insertDocument('destinations', adventure);
        revalidatePath('/adventures');
    } catch (error) {
        throw new Error('Failed to insert adventure into the database.');
    }

    return {
        success: true,
        message: 'Stored in the DB.',
        errors: {
            title: '',
            image: '',
            address: '',
            description: '',
            user: ''
        }
    };
}
