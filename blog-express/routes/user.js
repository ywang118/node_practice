var express = require('express');
var router = express.Router();
const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')

router.post('/login', function(req, res, next) {
    //直接可以从req。body拿出数据(因为有expres。json)
    const { username, password} = req.body
  
    // const {username, password} = req.query
    const result = login(username, password)

    return result.then(data=> {
        //RowDataPacket { username: 'lisi', realname: '李四' }
        if (data.username){
            //没必要设置cookie，直接设置session
 
            req.session.username = data.username
            req.session.realname = data.realname
            
            // console.log('req.session is', req.session)
            res.json(
                new SuccessModel()
            )
            return
        } 
        res.json(
            new ErrorModel("fail to login ")
        )
    })
});

// router.get('/login-test',(req,res,next)=> {
//     if (req.session.username){
//         res.json({
//             errno:0,
//             msg: '测试成功'
//         })
//         return
//     }
//     res.json({
//         errno: -1,
//         msg: '未登录'
//     })
// })

// router.get('/session-test', (req,res,next)=> {
//     const session = req.session
//     console.log(session)
//     if (session.viewNum == null){
//         session.viewNum = 0
//     }
//     session.viewNum++

//     res.json({
//         viewNum: session.viewNum
//     })
// })
module.exports = router;