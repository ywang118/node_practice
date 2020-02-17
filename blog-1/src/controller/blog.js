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
    //blogData 是一个博客对象， 包含 title， content author属性
    // 返回的是新建博客插入到 数据表的id   
    const title = blogData.title
    const content = blogData.content 
    const author = blogData.author
    const createTime = Date.now()
    const sql = `
        insert into blogs(title, content, createtime, author) 
        values('${title}', '${content}', ${createTime},'${author}');
        
    `
    return exec(sql).then(insertData=> {
        console.log('insertData is.... ',insertData)
        // insertData is....  OkPacket {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 3,
        //     serverStatus: 2,
        //     warningCount: 0,
        //     message: '',
        //     protocol41: true,
        //     changedRows: 0
        //   }
          
        return {
            id: insertData.insertId
        }
    })
   
}

const updateBlog =(id, blogData = {})=> {
    // return true
   const title = blogData.title
   const content = blogData.content 
   const sql = `
        update blogs set title = '${title}', content='${content}' where id = ${id}
   `
    return exec(sql).then(updateData=>{
        console.log('updateData is...', updateData)
        // updateData is... OkPacket {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 0,
        //     serverStatus: 2,
        //     warningCount: 0,
        //     message: '(Rows matched: 1  Changed: 1  Warnings: 0',
        //     protocol41: true,
        //     changedRows: 1
        //   }
        if (updateData.affectedRows >0){
            return true
        }
        return false
    })
   
} 

const delBlog =(id,author)=> {
    //return true
    const sql = `
        delete from blogs where id =${id} and author = '${author}';
    `
    return exec(sql).then(deleteData=> {
        if (deleteData.affectedRows >0){
            return true
        }
        return false
    
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog 
}