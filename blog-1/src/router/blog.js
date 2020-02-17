const {getList, getDetail,newBlog,updateBlog,delBlog  } = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleBlogRouter =(req, res) => {
     const method = req.method
     // id提到上面 
     const id = req.query.id
     // get blog list
     if (method === "GET" && req.path ==="/api/blog/list"){
         const author = req.query.author || ''
         const keyword = req.query.keyword || ''
        //  const listData = getList(author, keyword)
        //  return new SuccessModel(listData)
        const result = getList(author,keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
     }
     // get blog detail
     if (method ==="GET" && req.path === "/api/blog/detail"){
          
        //  const data = getDetail(id)
        //  return new SuccessModel(data)
        const result = getDetail(id)
        return result.then(data=> {
            return new SuccessModel(data)
        })
     }

     // create new blog
     if (method === "POST" && req.path === "/api/blog/new"){
        //  const data = newBlog(req.body)
        //  return new SuccessModel(data)
        
         const author = 'zhangsan' // 假数据，待开发登录时再改成真实数据
         req.body.author= author
         //req.body: body: { title: '老人与海', content: '老人与海100', author: 'zhangsan' }
         const result = newBlog(req.body)
         
         return result.then(data=> {
             //data 里是newid { id: 5 }
             console.log('data is ...,', data)
             return new SuccessModel(data)
            
         })
     }

     // update a blog
     if (method === "POST" && req.path === "/api/blog/update"){
        const result = updateBlog(id, req.body)
        return result.then(val=> {
            if (val) {
                return new SuccessModel
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

     // delete blog
     if (method === "POST" && req.path === "/api/blog/del"){
        const author = 'zhangsan' // 假数据，待开发登录时再改成真实数据
        const result = delBlog(id,author)
        result.then(val=> {
            if (val) {
                return new SuccessModel
            } else {
                return new ErrorModel('delete博客失')
            }

        })
     }
}

module.exports = handleBlogRouter