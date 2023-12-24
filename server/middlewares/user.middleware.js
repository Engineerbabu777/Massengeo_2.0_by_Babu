
import jwt from 'jsonwebtoken';



export const authProtection = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({msg: "No token, authorization denied"})
    }

    const token = req.headers.authorization.split(' ')[1]; //Bearer token

    if(token === 'null'){
        return res.status(401).json({msg: "No token, authorization denied"})
    }

    // REFRESH USER!!
    jwt.verify(token, process.env.JWT_SECRET)

}