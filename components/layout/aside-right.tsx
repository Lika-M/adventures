import Image from 'next/image';

import classes from './aside-right.module.css';

export default function AsideRight() {
    return (
        <aside className={classes.aside}>
            <div className={classes.link}>
                <a href="https://www.cntraveler.com/gallery/best-hotels-united-states-canada-gold-list" target="_blank" >
                    <Image
                        src="/images/EU_UK.png"
                        alt=""
                        width={280}
                        height={160}
                        sizes="(max-width: 768px) 100vw, 100vw"
                        style={{ objectFit: 'cover' }}
                    />

                    <p className={classes.gold}>gold list</p>
                    <h2 className={classes.title}>The Best Hotels and Resorts in the World: The Gold List 2025</h2>
                    <p className={classes.destination}>From Scotland to Italy.</p>
                </a>
            </div>
            <div className={classes.link}>
                <a href="https://www.cntraveler.com/gallery/best-hotels-united-states-canada-gold-list" target="_blank" >
                    <Image
                        src="/images/USA_Canada_Caribbean.png"
                        alt=""
                        width={280}
                        height={160}
                        sizes="(max-width: 768px) 100vw, 100vw"
                        style={{ objectFit: 'cover' }}
                    />

                    <p className={classes.gold}>gold list</p>
                    <h2 className={classes.title}>The Best Hotels and Resorts in the US, Canada, and the Caribbean: The Gold List 2025</h2>
                    <p className={classes.destination}>From Hawaii to Tennessee.</p>
                </a>
            </div>
        </aside>
    );
}