const getList = (author, keyword) => {
    // 数据格式
    return [
        {
            id: 1,
            title: 'titleA',
            content: 'contentA',
            createTime: 1546610491112,
            author: 'charlie'
        },
        {
            id: 2,
            title: 'titleB',
            content: 'contentB',
            createTime: 1546610524373,
            author: 'chris'
        }
    ]
}

const getDetail = (id) => {
    return  {
        id: 1,
        title: 'titleA',
        content: 'contentA',
        createTime: 1546610491112,
        author: 'charlie'
    }
}

module.exports = {
    getList,
    getDetail
}