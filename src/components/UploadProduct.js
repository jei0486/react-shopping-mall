import React, { useEffect,useState } from 'react'
import { Form, Input } from 'antd';
import FileUpload from '../util/FileUpload';
import Axios from 'axios';
const { TextArea } = Input;

const Categories = [
    { key: 1, value: "디지털/가전" },
    { key: 2, value: "전자제품" },
    { key: 3, value: "가공식품" },
    { key: 4, value: "남아의류" },
    { key: 5, value: "여아의류" },
]



function UploadProduct(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Images, setImages] = useState([])
    const [largeCat,setLargeCat] = useState([])
    const [smallCat,setSmallCat] = useState([])
    const [Quantity,setQuantity] = useState(0)

    const [Category, setCategory] = useState([])
    const [firstCategory, setFirstCategory] = useState([])
    const [secondCategory, setSecondCategory] = useState([])


    useEffect(() => {
      Axios.get('/product/categories')
        .then(response =>{

            setCategory(response.data);
            setFirstCategory(response.data.filter(l => l.catLv === 1))
        })
        .catch(err => alert(err))
    }, [])
    

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const quantityChangeHandler = (event) => {
        setQuantity(event.currentTarget.value)
    }
    
    const largeCatChangeHandler = (event) => {
        setLargeCat(event.currentTarget.value)

        setSecondCategory(Category.filter(c => c.upprCatCd === event.currentTarget.value))
    }

    const smallCatChangeHandler = (event) => {
        setSmallCat(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !largeCat || Images.length === 0) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }


        //서버에 채운 값들을 request로 보낸다.
        const body = {
            //로그인 된 사람의 ID 
            company: props.user.userData.id,

            title: Title,
            description: Description,
            unitPrice: Price,
            quantity: Quantity,
            image: Images,
            largeCatCd: largeCat,
            smallCatCd: smallCat
        }

        Axios.post('/product', body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패 했습니다.')
                }
            })
    }


    

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>  상품 업로드</h2>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>1차 카테고리</label>
                <select onChange={largeCatChangeHandler} value={firstCategory.catNm}
                        style={{width:'100px'}}>
                    {firstCategory.map(item => (
                        <option key={item.catCd} value={item.catCd}> {item.catNm}</option>
                    ))}
                </select>
                <br />
                <br />
                <label>2차 카테고리</label>
                <select onChange={smallCatChangeHandler} value={secondCategory.catNm}
                style={{width:'100px'}}>
                    {secondCategory.map(item => (
                        <option key={item.catCd} value={item.catCd}> {item.catNm}</option>
                    ))}
                </select>
                <br />
                <br />

                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />

                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>가격</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <label>수량</label>
                <Input type="number" onChange={quantityChangeHandler} value={Quantity} />
                <br />
                <br />

                <button type="submit">
                    상품등록
                </button>
            </Form>


        </div>
    )
}

export default UploadProduct
