import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  selectTime,
  tick,
} from './counterSlice';
import styles from './Counter.module.css';
import { TaskProgressBar } from '../../components/concrete';

export function Counter() {
  const count = useAppSelector(selectCount);
  const time = useAppSelector(selectTime)
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;
  
  useEffect(() => {
    const ptr = setInterval(() => dispatch(tick()), 1000)
    return () => clearInterval(ptr)
  })

  return (
    <div>
      <TaskProgressBar
        startTime={Math.floor((time.tick - 1) / 20) * 20}
        endTime={(Math.floor((time.tick - 1) / 20) + 1) * 20}
        currentTime={time.tick}
      />
      <div className={styles.row}>
        {("0" + time.hour).slice(-2)}:{("0" + time.minute).slice(-2)}
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
