import React from 'react'
import "./UserCardBlock.css"

function UserCardBlock(props) {

    console.log("UserCardBlock");
    console.log(props);
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '70px' }} 
                        alt="product"
                        src={renderCartImage(product.image)} />
                </td>
                <td>
                    {product.quantity} 개
                </td>
                <td>
                    {product.unitPrice} 원
                </td>
                <td>
                    <button onClick={() => props.removeItem(product.id)}>
                        삭제 
                    </button>
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
