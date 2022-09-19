import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let navigate = useNavigate();
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(auth()).then(response => {
                //Not Loggined in Status 
                if (!response.payload.access_token) {
                    
                    if (option) {
                        alert("로그인이 필요한 페이지입니다");
                        navigate("/login");
                    }
                    //Loggined in Status 
                } else {
                    //supposed to be Admin page, but not admin person wants to go inside
                    if (adminRoute && !response.payload.isAdmin) {
                        //props.history.push('/')
                        navigate("/");
                    }
                    //Logged in Status, but Try to go into log in page 
                    else {
                        if (option === false) {
                            //props.history.push('/')
                            navigate("/");
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}