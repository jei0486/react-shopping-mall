import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { loginUser } from "../actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";
import {UserOutlined, LockOutlined,RightOutlined} from "@ant-design/icons";
import {KEYCLOAK_CLIENTID} from './Config.js';
import axios from 'axios';

const { Title } = Typography;

function LoginPage() {

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialId = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    <Formik
      initialValues={{
        id: initialId,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string()
          .required('Id is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            //id: values.id,
            //password: values.password

            // for keycloak token login
            client_id: KEYCLOAK_CLIENTID,
            grant_type: 'password',
            username: values.id,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {

              if (response.payload && response.payload.access_token) {
                window.localStorage.setItem('userId', values.id);

                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }

                // react router v6 에서 바뀜 
                // props.history.push("/");

              //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
              //let base64Payload = response.data.payload.access_token.split('.')[1];

                // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정

                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`
                navigate("/");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              console.log(err);
              console.log(err.name + ": " + err.message);
              setFormErrorMessage('Check out your Account or Password again');

              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;

        return (
          <div className="app">

            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>

              <Form.Item required>
                <Input
                  id="id"
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your id"
                  type="text"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.id && touched.id ? 'text-input error' : 'text-input'
                  }
                />

                {errors.id && touched.id && (
                  <div className="input-feedback">{errors.id}</div>
                )}
              </Form.Item>
              <Form.Item required>
                <Input
                  id="password"
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>
              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                <Link className="login-form-forgot" to="/reset_user" style={{ float: 'right' }}>
                  비밀번호 찾기
                </Link>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    로그인
                </Button>
                </div>
                
                <Link to="/register">회원가입 <RightOutlined /> </Link>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginPage;