import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';


function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {

        // if (props.detail.image && props.detail.image.length > 0) {
        //     let images = []

        //     props.detail.image.map(item => {
        //         images.push({
        //             original: `${item}`,
        //             thumbnail: `${item}`
        //         })
        //     })
        //     setImages(images)
        // }

        const images = [
            {
              original: 'https://picsum.photos/id/1018/1000/600/',
              thumbnail: 'https://picsum.photos/id/1018/250/150/',
            },
            {
              original: 'https://picsum.photos/id/1015/1000/600/',
              thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
              original: 'https://picsum.photos/id/1019/1000/600/',
              thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
          ];

          setImages(images)
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage
