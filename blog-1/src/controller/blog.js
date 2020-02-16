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

const newBlog = (blogData = {})=> {
    //blogData 是一个博客对象， 包含 title， content 属性

    console.log('newBlog blogData....',blogData )
    return {
        id : 3
    }
}

const updateBlog =(id, blogData = {})=> {

    console.log('update blog...',id,  blogData)
   return true
}

const delBlog =(id)=> {
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog 
}