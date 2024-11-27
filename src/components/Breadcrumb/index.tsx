import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteConfig } from '@routes/index';
import styles from '@components/Breadcrumb/styles.module.scss';
import { FormattedMessage } from 'react-intl';

interface BreadcrumbProps {
  routes: RouteConfig[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ routes }) => {
  const location = useLocation();
  const isSpecialPaths = ['/', '/home', '/home/index'].includes(location.pathname);

  const getBreadcrumbItems = (pathname: string, routes: RouteConfig[]): RouteConfig[] => {
    if (isSpecialPaths) return [];
    for (const route of routes) {
      const { path } = route;
      if (path === pathname) {
        return [route];
      }
      if (route.children) {
        const childItems = getBreadcrumbItems(pathname, route.children);
        if (childItems.length > 0) {
          return [route, ...childItems];
        }
      }
    }
    return [];
  };

  const breadcrumbItems = getBreadcrumbItems(location.pathname, routes);

  return (
    <ol className={`${styles['breadcrumb']}`}>
      {!isSpecialPaths && (
        <li key={'/'} className={`${styles['breadcrumb-item']}`}>
          <Link to={'/'}>
            <FormattedMessage id="首页" />
          </Link>
        </li>
      )}
      {breadcrumbItems.map((item, index) => (
        <li
          key={item.path}
          className={`${styles['breadcrumb-item']} ${
            index === breadcrumbItems.length - 1 ? styles['active'] : ''
          }`}
        >
          {index === breadcrumbItems.length - 1 ? (
            <FormattedMessage id={item.name} />
          ) : (
            <Link to={item.path}>
              <FormattedMessage id={item.name} />
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
};

export default Breadcrumb;
