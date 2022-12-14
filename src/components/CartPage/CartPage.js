import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty, Result } from 'antd';
//import Paypal from '../../util/Paypal';

function CartPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(() => {

        console.log(user.cart);
        let cartItems = []
        //리덕스 User state안에 cart 안에 상품이 들어있는지 확인 
        if (user && user.cart) {
            if (user.cart.length > 0) {
                user.cart.forEach(item => {
                    cartItems.push(item.id)
                    calculateTotal(user.cart)
                })

                
            }
        }
    }, [user.cart])


    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.unitPrice, 10) * item.quantity
        })

        setTotal(total)
        setShowTotal(true)

    }

    let removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then(response => {

                if (response.payload.productInfo.length <= 0) {
                    setShowTotal(false)
                }

            })

    }

    const transactionSuccess = (data) => {
        dispatch(onSuccessBuy({
            paymentData: data,
            cartDetail: user.cartDetail
        }))
            .then(response => {
                if (response.payload.success) {
                    setShowTotal(false)
                    setShowSuccess(true)
                }
            })
    }


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>

            <div>
                <UserCardBlock products={user.cart} removeItem={removeFromCart} />
            </div>

            {ShowTotal ?
                <div style={{ marginTop: '3rem' }}>
                    <h2>총 : {Total} 원</h2>
                </div>
                : ShowSuccess ?
                    <Result
                        status="success"
                        title="Successfully Purchased Items"
                    />
                    :
                    <>
                        <br />
                        <Empty description={false} />
                    </>
            }


           {ShowTotal}
            
{/*            {ShowTotal &&
                <Paypal
                    total={Total}
                    onSuccess={transactionSuccess}
                />
            } */}

        </div>
    )
}

export default CartPage
