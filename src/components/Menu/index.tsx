import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteConfig } from '@routes/index';
import styles from '@components/Menu/styles.module.scss';
import CommonIcon from '@components/common/CommonIcon';

interface MenuProps {
  routes: RouteConfig[];
}

const Menu: React.FC<MenuProps> = ({ routes }) => {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const findOpenKey = (routes: RouteConfig[], path: string): string | null => {
      for (const route of routes) {
        if (route.path === path) {
          return route.path;
        }
        if (route.children) {
          const childOpenKey = findOpenKey(route.children, path);
          if (childOpenKey) {
            return route.path;
          }
        }
      }
      return null;
    };

    const currentPath = location.pathname;
    const newOpenKey = findOpenKey(routes, currentPath);
    setOpenKey(newOpenKey);
    setSelectedKey(currentPath);
  }, [location.pathname, routes]);

  const toggleSubMenu = (path: string) => {
    setOpenKey(openKey === path ? null : path);
  };

  const handleMenuItemClick = (path: string) => {
    setSelectedKey(path);
  };

  const renderMenu = (routes: RouteConfig[], level: number = 0) => {
    return routes.map((route) => {
      const { showInMenu = true, children, path, name, componentPath } = route;
      if (showInMenu && componentPath) {
        if (children) {
          return (
            <li key={path} className={styles.parent}>
              <div
                onClick={() => toggleSubMenu(path)}
                style={{ paddingLeft: `${level * 20}px` }}
                className="flex-ac-between"
              >
                <span>{name}</span>
                <CommonIcon type={`icon-arrow-${openKey === path ? 'up' : 'down'}`} color="#666" />
              </div>
              <ul className={`${styles.submenu} ${openKey === path ? styles.open : ''}`}>
                {renderMenu(children, level + 1)}
              </ul>
            </li>
          );
        } else {
          return (
            <li
              key={path}
              style={{ paddingLeft: `${level * 20}px` }}
              className={selectedKey === path ? styles.selected : ''}
            >
              {selectedKey !== path ? (
                <Link to={path} onClick={() => handleMenuItemClick(path)}>
                  {name}
                </Link>
              ) : (
                name
              )}
            </li>
          );
        }
      }
      return null;
    });
  };

  return (
    <ul className={`${styles.menu}`}>
      <li>
        <Link to={'/'}>首页</Link>
      </li>
      {renderMenu(routes)}
    </ul>
  );
};

export default Menu;
