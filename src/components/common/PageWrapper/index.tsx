import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Breadcrumb from '@components/common/Breadcrumb';
import styles from '@components/common/PageWrapper/styles.module.scss';
import { routes } from '@routes/index';

const PageWrapper: React.FC = () => {
  return (
    <div className={`${styles['page-panel']}`}>
      <div className={`${styles['page-container']}`}>
        <div className={`${styles['sliders']}`}>
          <div className={`${styles['logo-box']}`}>
            <div>img</div>
            <div>react-template</div>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Contact</Link>
              </li>
              <li>
                <Link to="/dashboard/settings">settings</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={`${styles['content']}`}>
          <header className={`${styles['header']}`}>
            <Breadcrumb routes={routes} />
            <div>hello，userName</div>
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
