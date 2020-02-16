const {getList, getDetail,newBlog,updateBlog  } = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleBlogRouter =(req, res) => {
     const method = req.method
     // id提到上面 
     const id = req.query.id
     // get blog list
     if (method === "GET" && req.path ==="/api/blog/list"){
         const author = req.query.author || ''
         const keyword = req.query.keyword || ''
         const listData = getList(author, keyword)
         return new SuccessModel(listData)
     }
     // get blog detail
     if (method ==="GET" && req.path === "/api/blog/detail"){
          
         const data = getDetail(id)
         return new SuccessModel(data)
     }

     // create new blog
     if (method === "POST" && req.path === "/api/blog/new"){
         const data = newBlog(req.body)
         return new SuccessModel(data)
     }

     // update a blog
     if (method === "POST" && req.path === "/api/blog/update"){
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel
        } else {
            return new ErrorModel('更新博客失败')
        }
    }

     // delete blog
     if (method === "POST" && req.path === "/api/blog/del"){
         return {
             msg: "this is delete new blog api"
         }
     }
}

module.exports = handleBlogRouter