const category = [
    {
        "_id": 1,
        "name": "가공식품"
    },
    {
        "_id": 2,
        "name": "건강식품"
    },
    {
        "_id": 3,
        "name": "가구/침구/인테리어"
    },
    {
        "_id": 4,
        "name": "가전/디지털"
    },
    {
        "_id": 5,
        "name": "반려동물"
    },
    {
        "_id": 6,
        "name": "스포츠/레저"
    },
    {
        "_id": 7,
        "name": "렌탈/여행"
    }

]

const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "10 to 100",
        "array": [10, 100]
    },
    {
        "_id": 2,
        "name": "101 to 1000",
        "array": [101, 1000]
    },
    {
        "_id": 3,
        "name": "1001 to 10000",
        "array": [1001, 10000]
    },
    {
        "_id": 4,
        "name": "10001 to 100000",
        "array": [10001, 100000]
    },
    {
        "_id": 5,
        "name": "More than 100000",
        "array": [100000, 100000000]
    }
]




export {
    category,
    price
}
