import { Admin } from "../db"

const jwt = require('jsonwebtoken')


async function authAdminMiddleware(req : any, res: any, next : any){
    const token = req.headers.authorization

    if(!token){
        res.status(403).json({
            msg : "token not found"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.adminID = decoded;
        if(decoded){
            const admin = await Admin.findOne({
                email : decoded
            })
            if(admin){
                next();
            }else{
                res.status(403).json({
                    msg : "registered id is not a admin"
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
    authAdminMiddleware
}