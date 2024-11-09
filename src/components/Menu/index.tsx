// Menu.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteConfig } from '@routes/index';

interface MenuProps {
  routes: RouteConfig[];
}

const Menu: React.FC<MenuProps> = ({ routes }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const toggleSubMenu = (path: string) => {
    if (openKeys.includes(path)) {
      setOpenKeys(openKeys.filter((key) => key !== path));
    } else {
      setOpenKeys([...openKeys, path]);
    }
  };

  const renderMenu = (routes: RouteConfig[]) => {
    return routes.map((route) => {
      if (route.children) {
        return (
          <li key={route.path}>
            <div onClick={() => toggleSubMenu(route.path)}>
              {route.name} {openKeys.includes(route.path) ? '▲' : '▼'}
            </div>
            {openKeys.includes(route.path) && <ul>{renderMenu(route.children)}</ul>}
          </li>
        );
      } else {
        return (
          <li key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        );
      }
    });
  };

  return <ul>{renderMenu(routes)}</ul>;
};

export default Menu;
