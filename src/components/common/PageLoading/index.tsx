import React from 'react';
import styles from '@components/common/PageLoading/styles.module.scss';

const PageLoading = ({ message = 'Loading...' }) => {
  return (
    <div className={`${styles['loading-container']}`}>
      <div className={`${styles['loading-spinner']}`}></div>
      <p>{message}</p>
    </div>
  );
};

export default PageLoading;
