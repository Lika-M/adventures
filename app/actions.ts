'use server'

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
    console.log(image)

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
        // Store image in Cloudinary
        // Store data in the DB

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
    }
}
