import React from 'react';
import styles from '@pages/Home/styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';

const Home: React.FC = () => {
  const { count } = useSelector((state: any) => state.global);
  const dispatch = useDispatch();
  return (
    <div className={`${styles.page}`}>
      <div>Home Page</div>
      <div>{count}</div>
      <button
        onClick={() => {
          dispatch({
            type: 'global/incrementAsync',
            payload: { count: count + 1 },
          });
        }}
      >
        add
      </button>
    </div>
  );
};

export default Home;
