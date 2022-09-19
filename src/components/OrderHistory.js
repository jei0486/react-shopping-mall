import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux';

function OrderHistory() {

    const [Order , setOrder] = useState([{}]);
    const user = useSelector(state => state.user);

    console.log(user.userData);
    
    // axios.get('https://example.com/getSomething', {
    //     headers: {
    //       Authorization: 'Bearer ' + token
    //     }
    // })

    useEffect(() => {
      const token = localStorage.getItem('jwt_token');  
      axios.get('/order/orders'
      ,{
         headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(response => {
            setOrder(response.data)
        })
        .catch(err => alert(err))
    }, [])
    
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>주문 내역</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>order Id</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>주문 금액</th>
                        <th>주문 날짜</th>
                    </tr>
                </thead>

                <tbody>

                    {Order && Order.length > 1 &&
                        Order.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.productName}</td>
                                <td>{item.quantity}</td>
                                <td>{item.paymentAmount}</td>
                                <td>{item.orderDate}</td>
                            </tr>
                        ))}

                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
