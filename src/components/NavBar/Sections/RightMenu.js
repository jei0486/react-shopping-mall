/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import { useNavigate , Link } from 'react-router-dom';
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

    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
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
          <Link to="/login">login</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">register</Link>
        </Menu.Item>
      </Menu>
    )
  } else if (user.userData && isAdmin) {

    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history">
          <Link to="/admin/history">OrderHistory</Link>
        </Menu.Item>

        <Menu.Item key="upload">
            <Link to="/goProduct/upload">Upload</Link>
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
          <Link to="/history">OrderHistory</Link>
        </Menu.Item>

      <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
        <Badge count={user.cart && user.cart.length}>
            <Link to="/user/cart" className="head-example" style={{ marginRight: -22, color: '#667777' }} >
             <ShoppingCartOutlined style={{ fontSize: 30, marginBottom: 3 }} />
            </Link>
        </Badge>
      </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>

      </Menu>
    )
  }

}

export default RightMenu;

