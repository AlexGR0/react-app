import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { RouteConfig } from '@routes/index';
import { connect } from 'react-redux';
import { GlobalState } from '@/models/global';
import { FormattedMessage } from 'react-intl';

interface MenuItem {
  key: string;
  label: string | React.JSX.Element;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface AppMenuProps extends GlobalState {
  routes: RouteConfig[];
}

const AppMenu: React.FC<AppMenuProps> = ({ routes, menuCollapsed }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const findOpenKeys = (routes: RouteConfig[], path: string): string[] => {
      for (const route of routes) {
        if (route.path === path) {
          return [route.path];
        }
        if (route.children) {
          const childOpenKeys = findOpenKeys(route.children, path);
          if (childOpenKeys.length > 0) {
            return [route.path, ...childOpenKeys];
          }
        }
      }
      return [];
    };

    const currentPath = location.pathname;
    const newOpenKeys = findOpenKeys(routes, currentPath);
    setOpenKeys(newOpenKeys.slice(0, 1)); // 只保留第一个父级菜单的键
    setSelectedKeys([currentPath]);
  }, [location.pathname, routes]);

  const onOpenChange = useCallback((keys: string[]) => {
    if (keys.length > 1) {
      setOpenKeys([keys[keys.length - 1]]); // 只保留最后一个打开的父级菜单的键
    } else {
      setOpenKeys(keys);
    }
  }, []);

  const generateMenuItems = (routes: RouteConfig[]): MenuItem[] => {
    return routes
      .map((route) => {
        const { showInMenu = true, children, path, name, componentPath } = route;
        if (showInMenu && componentPath) {
          const menuItem: MenuItem = {
            key: path,
            label: children ? (
              <FormattedMessage id={name} />
            ) : (
              <Link to={path}>
                <FormattedMessage id={name} />
              </Link>
            ),
          };

          if (children) {
            menuItem.children = generateMenuItems(children);
          }

          return menuItem;
        }
        return null;
      })
      .filter(Boolean) as MenuItem[];
  };

  const menuItems = useMemo(() => generateMenuItems(routes), [routes]);

  return (
    <Menu
      inlineCollapsed={menuCollapsed}
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      forceSubMenuRender={false}
      items={menuItems}
    />
  );
};

export default connect(({ global }: any) => ({
  menuCollapsed: global.menuCollapsed,
}))(memo(AppMenu));
