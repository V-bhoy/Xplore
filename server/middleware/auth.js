const jwt = require('jsonwebtoken');

const SECRET_KEY = 'Welcome-to-xplore';


const auth = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        let decodedData = jwt.verify(token,SECRET_KEY);
        req.userId = decodedData?.id;
        next();
    }
    catch(err){
        console.log(err);
    }
}


module.exports = auth;