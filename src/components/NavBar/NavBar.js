import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Space} from 'antd';
import {MenuOutlined , CloseOutlined} from '@ant-design/icons';
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <Link to="/">Shop</Link>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
      <Button type="primary"  className="menu__mobile-button" onClick={showDrawer} icon={<MenuOutlined />} />
        <Drawer
          title="React Shop"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
          extra={
            <Space>
              <Button onClick={onClose}><CloseOutlined /></Button>
            </Space>
          }
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
        
      </div>
    </nav>
  )
}

export default NavBar