import Link from 'next/link';

import classes from './404Page.module.css';

export default function FourOFourPage() {

    return (
        <div className={classes.wrapper}>
            <h1>404</h1>
            <h3>Ooops! The resource you are looking for is not found.</h3>
            <Link href="/adventures">Go back</Link>
        </div>
    );
}