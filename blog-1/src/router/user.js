const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')

// 获取cookie的过期时间 
const getCookieExpires=()=>{
    const d = new Date()
    // d的时间设置成当前时间加24 小时
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toUTCString is, ', d.toUTCString())
    return d.toUTCString()
}

const handleUserRouter = (req, res) => {
    const method = req.method
    
    //login

    if(method === "GET" && req.path === "/api/user/login"){
        const {username, password} = req.query
        const result = login(username, password)

        return result.then(data=> {
           //RowDataPacket { username: 'lisi', realname: '李四' }
            if (data.username){
                //没必要设置cookie，直接设置session

                req.session.username = data.username
                req.session.realname = data.realname
                console.log('req.session is..', req.session)
                return new SuccessModel()
            } 
            return  new ErrorModel("fail to login ")
        })
        
    }

    // 登录验证的测试
    if (method ==="GET" && req.path === "/api/user/login-test"){
        if (req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    session: req.session
                })
            )
        }
        return Promise.resolve(new ErrorModel("尚未登录"))
    }
}

module.exports = handleUserRouter