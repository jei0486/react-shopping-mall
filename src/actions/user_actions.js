import axios from 'axios';
import qs from 'qs';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY
} from './types';
import { USER_SERVER ,
    KEYCLOAK_REALM,
    KEYCLOAK_CLIENTID,
} from '../components/Config.js';

 
/* 
회원가입
*/
export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => {
            
            return response.data;
        });
    return {
        type: REGISTER_USER,
        payload: request
    }
}

/* 
keycloak  로그인 > access_token 및 user_info
*/
export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`
                                ,qs.stringify(dataToSubmit))
        .then(response => {  return response.data});
    return {
        type: LOGIN_USER,
        payload: request
    }
}

/* 
keycloak refresh token
*/
export function auth() {

    const request = axios.post(`${USER_SERVER}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
                    qs.stringify({
                        client_id: KEYCLOAK_CLIENTID,
                        grant_type: 'refresh_token',
                        refresh_token: localStorage.getItem('refresh_token')
                    }))
                    .then(response => {
                        
                        localStorage.setItem('jwt_token',response.data.access_token);
                        localStorage.setItem('refresh_token',response.data.refresh_token);

                        return response.data;
                    });

    return {
        type: AUTH_USER,
        payload: request
    }
}

// export function auth() {
//     const request = axios.get(`${USER_SERVER}/auth`)
//         .then(response => response.data);

//     return {
//         type: AUTH_USER,
//         payload: request
//     }
// }



export function addToCart(id) {
    let body = {
        productId: id
    }
    const request = axios.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data);
    return {
        type: ADD_TO_CART,
        payload: request
    }
}


export function getCartItems(cartItems, userCart) {

    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            // CartItem들에 해당하는 정보들을  
            // Product Collection에서 가져온후에 
            // Quantity 정보를 넣어 준다.
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}


export function removeCartItem(productId) {

    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
        .then(response => {
            //productInfo ,  cart 정보를 조합해서   CartDetail을 만든다. 
            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if (item.id === product._id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }

                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

export function onSuccessBuy(data) {

    const request = axios.post(`/api/users/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}