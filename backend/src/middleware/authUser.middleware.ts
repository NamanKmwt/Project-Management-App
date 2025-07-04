import { User } from "../db"

const jwt = require('jsonwebtoken')

async function authUserMiddleware(req : any, res : any, next : any){
    const token = req.headers.authorization

    if(!token){
        res.status(403).json({
            msg : "token not found"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        if(decoded){
            const user = await User.findOne({
                email : decoded
            })
            if(user){
                req.userID = decoded
                next();
            }else{
                    res.status(403).json({
                        msg : "registered id is not a user"
                    })
                }
        }
    }catch(e){
        res.status(403).json({
            msg : "user not authorized"
        })
    }

}

export {
    authUserMiddleware
}