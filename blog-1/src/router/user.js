const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const handleUserRouter = (req, res) => {
    const method = req.method
    
    //login

    if(method === "GET" && req.path === "/api/user/login"){
        const {username, password} = req.query
        const result = login(username, password)

        return result.then(data=> {
           //RowDataPacket { username: 'lisi', realname: '李四' }
            if (data.username){
                //操作cookie
                 res.setHeader('Set-Cookie', `username = ${data.username}; path=/;httpOnly`)
                return new SuccessModel()
            } 
            return  new ErrorModel("fail to login ")
        })
        
    }

    // 登录验证的测试
    if (method ==="GET" && req.path === "/api/user/login-test"){
        if (req.cookie.username) {
            return Promise.resolve(
                new SuccessModel({
                    username: req.cookie.username
                })
            )
        }
        return Promise.resolve(new ErrorModel("尚未登录"))
    }
}

module.exports = handleUserRouter