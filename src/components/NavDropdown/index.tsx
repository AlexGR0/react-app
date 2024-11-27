import React, { ReactDOM } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import CommonIcon from '@components/common/CommonIcon';
import { FormattedMessage } from 'react-intl';

interface NavDropdownProps {
  children: React.ReactNode;
}

const NavDropdown: React.FC<NavDropdownProps> = (props) => {
  const { children } = props;
  const userItems: MenuProps['items'] = [
    {
      label: <div style={{ textAlign: 'center' }}>userName</div>,
      key: '1',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      label: <FormattedMessage id="个人中心" />,
      key: '2',
      icon: <CommonIcon type="icon-yonghu" size={20} style={{ marginRight: 10 }} />,
    },
    {
      label: <FormattedMessage id="退出登录" />,
      key: '3',
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
