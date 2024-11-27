import React, { ReactDOM } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import CommonIcon from '@components/common/CommonIcon';

interface NavDropdownProps {
  children: React.ReactNode;
}

const NavDropdown: React.FC<NavDropdownProps> = (props) => {
  const { children } = props;
  const userItems: MenuProps['items'] = [
    {
      label: '个人中心',
      key: '1',
      icon: <CommonIcon type="icon-yonghu" size={20} style={{ marginRight: 10 }} />,
    },
    {
      type: 'divider',
    },
    {
      label: '退出登录',
      key: '2',
      icon: <CommonIcon type="icon-tuichu" size={20} style={{ marginRight: 10 }} />,
    },
  ];

  return (
    <Dropdown menu={{ items: userItems }} trigger={['click']} placement="bottomRight" arrow>
      {children}
    </Dropdown>
  );
};

export default NavDropdown;
