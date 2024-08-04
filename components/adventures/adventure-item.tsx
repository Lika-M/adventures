import Image from 'next/image';

import { type Adventure } from '@/types';
import DetailBtn from '@/components/adventures/detail-btn';
import classes from './adventure-item.module.css';

export default function AdventureItem({ id, title, image, address }: Adventure) {
    
    return (
        <li className={classes.item}>
            <div className={classes.card}>
                <div className={classes.image}>
                    <Image
                        src={image}
                        alt={title}
                        width={700}
                        height={300}
                        sizes="(max-width: 700px) 100vw, 700px"
                    />
                </div>
                <div className={classes.description}>
                    <div className={classes.content}>
                        <h3>{title}</h3>
                        <address>{address}</address>
                    </div>
                   <DetailBtn id={id}/>
                </div>
            </div>
        </li>
    );
}