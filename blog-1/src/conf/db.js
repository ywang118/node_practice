const env = process.env.NODE_ENV  // 环境变量

//配置
let MYSQL_CONF
   //开发环境下
if (env === 'dev') {
    MYSQL_CONF={
        host: '127.0.0.1',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myblog'
    }
}

if (env === 'production') {
    // 线上环境下，目前没有服务器，本地环境来模拟
    MYSQL_CONF={
        host: '127.0.0.1',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myblog'
    }
}
module.exports = {
    MYSQL_CONF
}