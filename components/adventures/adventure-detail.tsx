import Image from 'next/image';

import { type Adventure } from '@/types';
import { FaMapMarkerAlt } from 'react-icons/fa';
import classes from './adventure-detail.module.css';

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

export default function AdventureDetail({ title, image, address, description, createdAt }: Partial<Adventure>) {

     const formattedDate = formatDate(createdAt as string);

    return (
        <section className={classes.detail}>
            {/* {image && */}
                <Image
                    src={image as string}
                    alt={title as string}
                    width={700}
                    height={475}
                    className={classes.img}
                    sizes="(max-width: 700px) 100vw, 700px"
                />
                 {/* } */}
            <div className={classes.content}>
                <h1>{title}</h1>
                <div className={classes.address}>
                    <FaMapMarkerAlt className={classes.icon} />
                    <address>{address}</address>
                </div>
                {formattedDate && <p className={classes.date}>Created at {formattedDate}</p>}
                <div className={classes.description}>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    );
}