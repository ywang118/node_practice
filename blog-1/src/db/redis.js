const redis= require('redis')
const {REDIS_CONF} = require('../conf/db')

// 创建客户端

const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error',err =>{
    
    console.error(err)
})

// 提供两个函数

function set(key,val){
    if (typeof val === "object"){
        val = JSON.stringify(val)
    }
  return redisClient.set(key,val,redis.print)
}

function get(key){ 
    //异步形式，用promise 进行封装
    const promise = new Promise((resolve,reject)=> {
        redisClient.get(key,(err,val)=> {
            if(err){
                reject(err)
                return
            }
            // 如果key值没有获取到
            if(val == null){
                resolve(null)
                return
            }
            // 兼容json 转换格式
            try{
                resolve(
                    JSON.parse(val)
                )

            }catch(ex){
                resolve(val)
            }
          
        })
    })

    return promise 
     
}

module.exports = {
    set,
    get
}