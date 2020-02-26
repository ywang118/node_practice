var express = require('express');
var router = express.Router();
const {getList, getDetail,newBlog,updateBlog,delBlog  } = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

   if (req.query.isadmin){
       //管理员界面
       if (req.session.username == null){
           //未登录
           res.json(
               new ErrorModel('未登录')
           )
           return
       }
       //强制查询自己的博客
       author = req.session.username
   }

   const result = getList(author,keyword)
   return result.then(listData => {
       res.json(
         new SuccessModel(listData)
       )
   })
});
router.get('/detail',function(req,res,next) {
     
    const result = getDetail(req.query.id)
    return result.then(data=> {
        res.json( 
            new SuccessModel(data)
        )
    })
});    

const loginCheck = require('../middleware/loginCheck')
router.post('/new', loginCheck, (req,res,next)=> {
    // 中间件/////////
    // if(req.session.username){
    //     next()
    //     return
    // }
    // return res.json(
    //     new ErrorModel('未登录')
    // )
    
    req.body.author= req.session.username
    //req.body: body: { title: '老人与海', content: '老人与海100', author: 'zhangsan' }
    const result = newBlog(req.body)
    
    return result.then(data=> {
        //data 里是newid { id: 5 }
        
        res.json(
            new SuccessModel(data)
        )
    })
})

router.post('/update',loginCheck,(req,res,next)=> {

    const result = updateBlog(req.query.id, req.body)
    return result.then(val=> {
        if (val) {
            res.json(
                new SuccessModel
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            )
        }
    })
})

router.post('/del', loginCheck, (req,res,next)=> {
    
    const author = req.session.username
    const result = delBlog(req.query.id,author)
    return result.then(val=> {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('delete博客失')
            )
        }
    })
})

module.exports = router;