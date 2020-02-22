const {getList, getDetail,newBlog,updateBlog,delBlog  } = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

// 统一的登录验证函数
const loginCheck =(req)=> {
    if (!req.session.username){
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}


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
        
         const loginCheckResult = loginCheck(req)
         if (loginCheckResult){
             //未登录
             return loginCheck
         }
         
         req.body.author= req.session.username
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
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult){
            //未登录
            return loginCheck
        }
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
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult){
            //未登录
            return loginCheck
        }
        const author = req.session.username
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