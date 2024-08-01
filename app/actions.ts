'use server'

type FormState = {
    success: boolean,
    message: string,
    errors: string[]
}

export async function createAdventure(prevState: FormState, formData: FormData) {

    console.log(formData.get('image'));

    //TODO validation

    const title = formData.get('title');
    const image = formData.get('image') as File;
    const address = formData.get('address');
    const description = formData.get('description');

    let errors: string[] = [];

    if (!title || title === '') {
        errors.push('Title is required!');
    }

    if (!image || image.size === 0) {
        errors.push('Image is required!');
    }

    if (!address || address === '') {
        errors.push('Address is required!');
    }

    if (!description || description === '') {
        errors.push('Description is required!');
    }

    if (errors.length > 0) {
        return {
            success: true,
            message: 'Invalid data.',
            errors: []
        };
    } else {
        // Store image in Cloudinary
        // Store data in the DB
        
        return {
            success: false,
            message: 'Stored in the DB.',
            errors: errors
        };





    }
}
