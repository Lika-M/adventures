import AdventureItem from '@/components/adventures/adventure-item';
import { type Adventure } from '@/types.js';

import classes from './adventure-list.module.css';

type AdventuresListProps = {
    adventures: Adventure[],
} 

export default function AdventureList({ adventures }: AdventuresListProps) {
    return (
        <ul className={classes.list}>
            {adventures.map(({ id, image, title, address, description, createdAt }) => (
                <AdventureItem
                    key={id}
                    id={id}
                    image={image}
                    title={title}
                    address={address}
                    description={description}
                    createdAt={createdAt}
                />
            ))}
        </ul>
    );
}