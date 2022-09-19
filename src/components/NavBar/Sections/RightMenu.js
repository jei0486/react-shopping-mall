/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {ShoppingCartOutlined} from '@ant-design/icons';
import {KEYCLOAK_CLIENTID} from '../../Config';

function RightMenu(props) {

  let navigate = useNavigate();
  
  // USER 는 REDUSER 에서 관리중
  const user = useSelector(state => state.user);

  /* 
    관리자 권한 체크
      KEYCLOAK CLIENT ROLE > ROLE_ADMIN / ROLE_USER 체크 하고 있음
  */
  let isAdmin = false;
  if (user.userData){
    isAdmin = `user.userData.resource_access.${KEYCLOAK_CLIENTID}.roles` === 'ROLE_ADMIN' ? true : false;
    //console.log(`user.userData.resource_access.${KEYCLOAK_CLIENTID}.roles`);
    //console.log("isAdmin " + isAdmin);
  }
  
  const logoutHandler = () => {

    navigate("/login");

    /* 
       로그아웃을 할때마다 KEYCLOAK 에서 세션 을 삭제할수도 있지만 ... 
       1. KEYCLOAK 서버 부하가 예상
       2. 서비스의 특징에따라 로그아웃이 필수가 되지않을 수 있음

       따라서 주석처리를 해놓음.
    */
    // axios.get(`${USER_SERVER}/logout`).then(response => {
    //   if (response.status === 200) {
    //     navigate("/login");
    //   } else {
    //     alert('Log Out Failed')
    //   }
    //});
  };

  
  if (!user.userData) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">login</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">register</a>
        </Menu.Item>
      </Menu>
    )
  } else if (user.userData && isAdmin) {

    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history">
          <a href="/admin/history">OrderHistory</a>
        </Menu.Item>

        <Menu.Item key="upload">
            <a href="/goProduct/upload">Upload</a>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>

      </Menu>
    )
  }  else if (user.userData && !isAdmin) {

    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history">
          <a href="/history">OrderHistory</a>
        </Menu.Item>

        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
            <a href="/user/cart" className="head-example" >
              Cart
            </a>
          {/* <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" className="head-example" style={{ marginRight: -22, color: '#667777' }} >
             <ShoppingCartOutlined style={{ fontSize: 30, marginBottom: 3 }} /> Cart
            </a>
          </Badge> */}
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>

      </Menu>
    )
  }

}

export default RightMenu;

