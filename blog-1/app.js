const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req,res) => {
  // 设置返回格式
  res.setHeader('Content-type','application/json')

  
  //  获取 path
  const url = req.url
  req.path = url.split('?')[0]
  // 解析 query
  req.query = querystring.parse(url.split('?')[1])
  // blog api
   const blogData = handleBlogRouter(req,res)
   if(blogData){
       res.end(
           JSON.stringify(blogData)
       )
       return
   }
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
}

module.exports = serverHandle

//process.env.NODE_ENV