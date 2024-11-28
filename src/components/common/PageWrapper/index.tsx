import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { routes } from '@routes/index';
import Menu from '@components/Menu';
import Breadcrumb from '@components/Breadcrumb';
import NavDropdown from '@components/NavDropdown';
import RatioImage from '@components/common/RatioImage';
import CommonIcon from '@components/common/CommonIcon';
import styles from '@components/common/PageWrapper/styles.module.scss';
import LogoImg from '@assets/images/logo.png';
import { Button, ColorPicker, theme } from 'antd';
import { connect } from 'react-redux';
import { GlobalState } from '@/models/global';
import { FormattedMessage } from 'react-intl';

interface PageWrapperProps extends GlobalState {
  dispatch: (action: any) => void;
}

const { useToken } = theme;

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const { mainColor, locale, menuCollapsed, dispatch } = props;
  const { token } = useToken();

  return (
    <div className={`${styles['page-panel']}`}>
      <div className={`${styles['page-container']}`}>
        <div
          className={`${styles['sliders']}`}
          style={{ flexBasis: menuCollapsed ? 'auto' : '17%' }}
        >
          <div>
            <Link to="/" className={`${styles['logo-box']}`}>
              <RatioImage src={LogoImg} round width={30} />
              {!menuCollapsed && (
                <div
                  className={`${styles['logo-text']}`}
                  style={{
                    color: token.colorPrimaryText,
                  }}
                >
                  <FormattedMessage id="react后台系统模板" />
                </div>
              )}
            </Link>
          </div>
          <div className={`${styles['menu']}`}>
            <Menu routes={routes} />
          </div>
        </div>
        <div className={`${styles['content']}`}>
          <header className={`${styles['header']}`}>
            <div className={`${styles['header-left']}`}>
              <CommonIcon
                onClick={() => dispatch({ type: 'global/menuCollapsedToggle' })}
                type={`icon-${!menuCollapsed ? 'lanmushouqi' : 'lanmuzhankai'}`}
                size={20}
                color={token.colorPrimaryText}
                style={{ marginRight: 10, cursor: 'pointer' }}
              />
              <Breadcrumb routes={routes} />
            </div>
            <div className={`${styles['header-right']}`}>
              <ColorPicker
                value={mainColor}
                onChangeComplete={(_) =>
                  dispatch({
                    type: 'global/changeMainColor',
                    payload: { mainColor: _.toHexString() },
                  })
                }
              >
                <Button
                  icon={<CommonIcon type={`icon-zhuti`} size={20} color={token.colorPrimaryText} />}
                  type="text"
                />
              </ColorPicker>
              <Button
                onClick={() => dispatch({ type: 'global/localeToggle' })}
                icon={
                  <CommonIcon
                    type={`icon-language-${locale}`}
                    size={20}
                    color={token.colorPrimaryText}
                  />
                }
                type="text"
              />
              <NavDropdown>
                <Button icon={<RatioImage width={20} round />} type="text" />
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

export default connect(({ global }: any) => ({
  mainColor: global.mainColor,
  locale: global.locale,
  menuCollapsed: global.menuCollapsed,
}))(PageWrapper);
