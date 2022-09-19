import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import axios from "axios";
import { Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../util/ImageSlider';
import Checkbox from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { category, price } from './Sections/Datas';
import { ShoppingCartOutlined } from '@ant-design/icons';

function MainPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        category: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        getProducts()

    }, [])

    const getProducts = () => {
        axios.get('/product/products')
            .then(response => {
                if (response.data != null && response.data.length > 0) {
                    setProducts(response.data)
                    //setPostSize(response.data.postSize)
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }


    const loadMoreHanlder = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getProducts(body)
        setSkip(skip)
    }


    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<Link to={`/productDetail/${product.id}`} ><ImageSlider images={product.image} /></Link>}
            >
                <Meta
                    title={product.name}
                    description={`${product.unitPrice} 원`}
                />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)

    }


    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log('filters', filters)

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)

    }



    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h2> React Shoppingmall with Axon <ShoppingCartOutlined /> </h2>
            </div>

            {/* Filter */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <Checkbox list={category} handleFilters={filters => handleFilters(filters, "category")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>
            </Row>

            {/* Search */}

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/* Cards */}


            <Row gutter={[16, 16]} >
                {renderCards}
            </Row>

            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHanlder}>더보기</button>
                </div>
            }

        </div>
    )
}

export default MainPage
