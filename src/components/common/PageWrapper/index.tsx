import React from 'react';
import { Outlet } from 'react-router-dom';
import Breadcrumb from '@components/Breadcrumb';
import RatioImage from '@components/common/RatioImage';
import Menu from '@components/Menu';
import styles from '@components/common/PageWrapper/styles.module.scss';
import { routes } from '@routes/index';
import LogoImg from '@assets/images/logo.png';

const PageWrapper: React.FC = () => {
  return (
    <div className={`${styles['page-panel']}`}>
      <div className={`${styles['page-container']}`}>
        <div className={`${styles['sliders']}`}>
          <div className={`${styles['logo-box']}`}>
            <RatioImage src={LogoImg} round width={30} />
            <div className={`${styles['logo-text']}`}>react-template</div>
          </div>
          <div className={`${styles['menu']}`}>
            <Menu routes={routes} />
          </div>
        </div>
        <div className={`${styles['content']}`}>
          <header className={`${styles['header']}`}>
            <Breadcrumb routes={routes} />
            <div className={`${styles['info-box']}`}>
              <div className={`${styles['user']}`}>
                <RatioImage width={30} round />
                <div className={`${styles['name']}`}>userName</div>
              </div>
              <div>退出登录</div>
            </div>
          </header>
          <main className={`${styles['main']}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
