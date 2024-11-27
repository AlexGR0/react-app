import React from 'react';
import styles from '@components/common/PageLoading/styles.module.scss';
import { FormattedMessage } from 'react-intl';

const PageLoading = ({ message = <FormattedMessage id="加载中..." /> }) => {
  return (
    <div className={`${styles['loading-container']}`}>
      <div className={`${styles['loading-spinner']}`}></div>
      <p>{message}</p>
    </div>
  );
};

export default PageLoading;
