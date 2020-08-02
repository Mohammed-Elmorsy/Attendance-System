const jwt = require("jsonwebtoken") ;
require('dotenv').config();

module.exports  = function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request headers dont have authorization key')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request token is null')    
    }
    try {
        let payload = jwt.verify (token, process.env.ACCESS_TOKEN_SECRET)
        req.role = payload.role
        next ()

    } 
    catch (err) {
        return res.status(401).send ('Unauthorized request invalid token')
    }
  }