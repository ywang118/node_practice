const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 获取cookie的过期时间 
const getCookieExpires=()=>{
    const d = new Date()
    // d的时间设置成当前时间加24 小时
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toUTCString is, ', d.toUTCString())
    return d.toUTCString()
}

// session 数据
const SESSION_DATA = {}
// 用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve,reject)=> {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk=> {
            postData += chunk.toString()
        })
        req.on('end',()=> {
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}
const serverHandle = (req,res) => {
  // 设置返回格式
  res.setHeader('Content-type','application/json')

  
  //  获取 path
  const url = req.url
  req.path = url.split('?')[0]
  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '' // k1=v1; k2=v2
  cookieStr.split(';').forEach(item=> {
      if (!item){
          return
      }
      const arr = item.split('=')
      const key= arr[0].trim()
      const val= arr[1].trim()
      req.cookie[key] = val

  })
  console.log('cookie...',req.cookie)
  
  //  解析session
  let needSetCookie = false
  let userId = req.cookie.userid 
  if (userId){
    if(!SESSION_DATA[userId]) {
        SESSION_DATA[userId] = {} 
    } 
     
  } else {
      needSetCookie = true
      userId = `${Date.now()}_${Math.random()}`
      SESSION_DATA[userId] = {}
      
  }
  req.session = SESSION_DATA[userId]

  // 处理 postdata 
  getPostData(req).then(postData=> {
    req.body = postData
      // 处理 blog router
    // const blogData = handleBlogRouter(req,res)
    // if(blogData){
    //     res.end(
    //         JSON.stringify(blogData)
    //     )
    //     return
    // }
 //blogData 直接返回结果值， blogResult 返回的是promise



    const blogResult  = handleBlogRouter(req,res)
    if (blogResult) {
        blogResult.then(blogData=> {
            if (needSetCookie){
                res.setHeader('Set-Cookie', `userid = ${userId}; path=/;httpOnly; expires = ${getCookieExpires()}`)
            }
            res.end(
                JSON.stringify(blogData)
            )
        })
        return 
    }
        // 处理 user router
    // const userData = handleUserRouter(req,res)
    // if(userData){
    //     res.end(
    //         JSON.stringify(userData)
    //     )
    //     return
    // }

    // handleUserRouter 返回的是promise
     const userResult = handleUserRouter(req,res)
    
     if (userResult){
       
        userResult.then(userData=> {
            // 如果需要设置cookie的话
            if (needSetCookie){
                res.setHeader('Set-Cookie', `userid = ${userId}; path=/;httpOnly; expires = ${getCookieExpires()}`)
            }
            //Promise { SuccessModel { errno: 0 } }
            res.end(
                JSON.stringify(userData)
            )   
        })
        return
     }

    // 未命中api ， 404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 NOT FOUND")
    res.end()
  })
  
}

module.exports = serverHandle

//process.env.NODE_ENV