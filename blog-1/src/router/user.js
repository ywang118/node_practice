const handleUserRouter = (req, res) => {
    const method = req.method
    
    //login

    if(method === "POST" && req.path === "/api/user/login"){
        return {
            msg: "this is login api"
        }
    }
}

module.exports = handleUserRouter