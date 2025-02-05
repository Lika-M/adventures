import classes from './aside-left.module.css';

export default function AsideLeft() {
    return (
        <aside className={classes.aside}>
            <div className={classes.content}>
                <h2>
                    Our<span> rating </span>system
                </h2>
                <h4>Our reviews come from verified users-just like you!</h4>
                <p>The star ratings are based on the overall rating of each brand. Some reviews are provided via third party suppliers. We encourage you to write a review of your experiences with these brands.</p>
            </div>
        </aside>
    )
}