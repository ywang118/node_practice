const {exec} = require('../db/mysql')
const getList = (author, keyword) => {
    // 数据格式
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
         sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
     //返回的promise 
    return exec(sql)
}

const getDetail = (id) => {
    // return  {
    //     id: 1,
    //     title: 'titleA',
    //     content: 'contentA',
    //     createTime: 1546610491112,
    //     author: 'charlie'
    // }
    const sql = `select * from blogs where id ='${id}'`
    //返回的数组 
    return exec(sql).then(rows=> {
        return rows[0]
    })
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