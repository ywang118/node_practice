const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

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

  // 处理 postdata 
  getPostData(req).then(postData=> {
    req.body = postData
      // 处理 blog router
    const blogData = handleBlogRouter(req,res)
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
        return
    }
        // 处理 user router
    const userData = handleUserRouter(req,res)
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
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