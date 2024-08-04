'use client';

import { useRouter } from 'next/navigation';
import classes from './detail-btn.module.css';

type DetailBtnProps = {
  id: string;
};

export default function DetailBtn({ id }: DetailBtnProps) {
  const router = useRouter();

  function showDetail() {
    router.push(`/adventures/${id}`);
  }

  return (
    <div className={classes.actions}>
      <button onClick={showDetail}>Show Details</button>
    </div>
  );
}
