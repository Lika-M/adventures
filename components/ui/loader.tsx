import classes from './loader.module.css';

type LoaderProps = {
isSending: boolean
}

export default function Loader({isSending}: LoaderProps) {
    return (
        <div
            className={classes.wrapper}
            style={{ visibility:isSending ? 'visible' : 'hidden' }}
        >
            <div className={classes.track}>
                <div className={classes.kurt}>
                    <div className={classes.loader}></div>
                </div>
            </div>
        </div>
    );
}