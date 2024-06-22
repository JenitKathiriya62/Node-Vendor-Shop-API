const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = async(req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['authorization'];

    if(!token){
       return res.status(201).send({success:false,msg:"Token is Required For Auth"});
    }
    try {

        const decode = jwt.verify(token,config.secret_jwt);
        req.user=decode;
    } catch (error) {
      return  res.status(400).send("Invalid Token");
    }

    return next();
}

module.exports = verifyToken;