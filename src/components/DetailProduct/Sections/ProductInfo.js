import React ,{useCallback} from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../actions/user_actions';

function ProductInfo(props) {

    const dispatch = useDispatch();

    const clickHandler = () => {
        // 필요한 정보를 Cart 필드에다가 넣어 준다.
        dispatch(addToCart(props.detail))
    }

    // const clickHandler = useCallback(() => {
    //     dispatch(addToCart(props.detail))
    //   }, [{}]);

    return (
        <div>
            <Descriptions title="상품 상세 설명">
                <Descriptions.Item label="가격">{props.detail.unitPrice} 원</Descriptions.Item>
                {/* <Descriptions.Item label="status">{props.detail.status}</Descriptions.Item> */}
                <Descriptions.Item label="조회수">{props.detail.readCnt}</Descriptions.Item>
                <Descriptions.Item label="상품 설명">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    장바구니 담기
                </Button>
            </div>


        </div>
    )
}

export default ProductInfo