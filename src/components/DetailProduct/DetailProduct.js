import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col } from 'antd';
import { useParams } from 'react-router-dom'
import { auth } from '../../actions/user_actions';
import { useDispatch } from 'react-redux';

function DetailProduct(props) {

    
    //const productId = props.match.params.productId
    const {productId} = useParams()
    const [Product, setProduct] = useState({})

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth());

        axios.get(`/product/product/${productId}`)
            .then(response => {
                setProduct(response.data)
            })
            .catch(err => alert(err))
    }, [])



    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.name}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} sm={24}>
                    {/* ProductImage */}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* ProductInfo */}
                    <ProductInfo detail={Product} />
                </Col>
            </Row>





        </div>
    )
}

export default DetailProduct
