import React from 'react';
import { Outlet } from 'react-router-dom';
import { routes } from '@routes/index';
import Menu from '@components/Menu';
import Breadcrumb from '@components/Breadcrumb';
import NavDropdown from '@components/NavDropdown';
import RatioImage from '@components/common/RatioImage';
import CommonIcon from '@components/common/CommonIcon';
import styles from '@components/common/PageWrapper/styles.module.scss';
import LogoImg from '@assets/images/logo.png';
import { useSelector, useDispatch } from 'react-redux';

const PageWrapper: React.FC = () => {
  const { menuCollapsed } = useSelector((state: any) => state.global);
  const dispatch = useDispatch();

  const handleChangeMenuCollapsedToggle = () => {
    dispatch({ type: 'global/menuCollapsedToggle' });
  };

  return (
    <div className={`${styles['page-panel']}`}>
      <div className={`${styles['page-container']}`}>
        <div
          className={`${styles['sliders']}`}
          style={{ flexBasis: menuCollapsed ? 'auto' : '17%' }}
        >
          <div className={`${styles['logo-box']}`}>
            <RatioImage src={LogoImg} round width={30} />
            {!menuCollapsed && <div className={`${styles['logo-text']}`}>react-template</div>}
          </div>
          <div className={`${styles['menu']}`}>
            <Menu routes={routes} />
          </div>
        </div>
        <div className={`${styles['content']}`}>
          <header className={`${styles['header']}`}>
            <div className={`${styles['header-left']}`}>
              <CommonIcon
                onClick={handleChangeMenuCollapsedToggle}
                type={`icon-${!menuCollapsed ? 'lanmushouqi' : 'lanmuzhankai'}`}
                color="#333"
                size={20}
                style={{ marginRight: 10, cursor: 'pointer' }}
              />
              <Breadcrumb routes={routes} />
            </div>
            <div className={`${styles['header-right']}`}>
              <NavDropdown>
                <div className={`${styles['user']}`}>
                  <RatioImage width={30} round />
                  <div className={`${styles['name']}`}>userName</div>
                </div>
              </NavDropdown>
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
