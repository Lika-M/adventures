# Adventures - Travel Journal

## Project Description

"Adventures" is a web application that allows users to create and share their travel experiences by adding new places and adventures to a personal journal. The application includes user authentication, image uploads, and a view of all added adventures.

## Demo Links

- **Vercel Deployment**: [Live Demo](https://adventures-eta.vercel.app/)
- **GitHub Repository**: [GitHub Repository](https://github.com/Lika-M/adventures)

## Technologies

- **Next.js 14** with App Router
- **TypeScript**
- **MongoDB Atlas** for data storage
- **NextAuth.js** for user authentication
- **Cloudinary** for image upload and storage
- **React and Next.js Hooks** such as `useFormState`, `useSession`, `usePathname`, `useRouter`, `useFormStatus`, and others 

## Key Features

- **User Registration and Login**: Users can create an account and log in to access the application.
- **Authenticated Adventure Creation**: Only authenticated users can add new adventures through a form that directly saves the information to the database.
- **Image Upload**: Use Cloudinary to upload and store images for each adventure.
- **View All Adventures**: Users can browse a list of all added adventures.
- **Error Handling**: Comprehensive error handling is implemented on both the server and client sides for managing requests and forms.
- **Custom Error and Not-Found Pages**: The application includes custom error and not-found pages.

## Project Structure

- **`/actions`**: Contains server-side actions for handling form submissions and database operations, including checks for required fields and handles errors.
- **`/app`**: Main components and routes of the application.
- **`/components`**: Reusable React components.
- **`/lib`**: Libraries and helper functions, including MongoDB and Cloudinary connections.
- **`/public`**: Static assets like images.

## Installation Instructions

1. Clone the repository: `git clone https://github.com/Lika-M/adventures`
2. Install dependencies: `npm install`
3. Add a `.env` file with the necessary variables:
    ```bash
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_next_auth_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
