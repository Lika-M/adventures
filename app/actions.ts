'use server';

import { uploadImage } from "@/lib/cloudinary";

export type FormState = {
    success: boolean,
    message: string,
    errors: {
        title: string;
        image: string;
        address: string;
        description: string;
    }
}

const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function createAdventure(prevState: FormState, formData: FormData) {
    const title = formData.get('title') as string;
    const image = formData.get('image') as File;
    const address = formData.get('address') as string;
    const description = formData.get('description') as string;

    let errors: FormState['errors'] = {
        title: '',
        image: '',
        address: '',
        description: ''
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

    if (hasErrors) {
        return {
            success: false,
            message: 'Invalid data.',
            errors: errors
        };
    } else {
        try {
            if (image) {
                const arrayBuffer = await image.arrayBuffer();
                const base64String = Buffer.from(arrayBuffer).toString('base64');
                const fileUri = `data:${image.type};base64,${base64String}`;

                await uploadImage(fileUri);
                console.log('success!');
            }

            // Store data in the DB

            await delay(5000);

            return {
                success: true,
                message: 'Stored in the DB.',
                errors: {
                    title: '',
                    image: '',
                    address: '',
                    description: ''
                }
            };
        } catch (error: any) {
            errors.image = 'Image uploading fails!';

            return {
                success: false,
                message: error.message,
                errors: errors
            };
        }
    }
}
