import express from "express";
const router = express.Router();
import z from 'zod'
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config();
import { Task, User } from "../db";
import { authUserMiddleware } from "../middleware/authUser.middleware";
import { authAdminMiddleware } from "../middleware/authAdmin.middleware";


const inputSchema = z.object({
    email : z.string().email(), 
    name : z.string(), 
    password : z.string().min(8)
})

router.post('/signup' , async function(req : any, res : any){
    const body = req.body;
    const {success} = inputSchema.safeParse(body)
    if(!success){
        return res.status(401).json({
            msg : "Incorrect input format"
        })
    }
    const other = await User.findOne({
        email : body.email
    })
    if(other){
        return res.status(403).json({
            msg : "email already registered "
        })
    }
    const user = await User.create({
        email : body.email , 
        name : body.name, 
        password : body.password
    })
    
    if(!user){
        return res.status(403).json({
            msg : "An error occured while registering user"
        })
    }
    const token = jwt.sign(user.email ,process.env.JWT_SECRET );


    res.status(200).json({
        name : user.name, 
        token : token
    })
})

const signinInputSchema = z.object({
    email : z.string().email(), 
    password : z.string().min(8)
})

router.post('/signin' , async function(req : any, res : any){
    const body = req.body
    const {success} = signinInputSchema.safeParse(body)
    if(!success){
        return res.status(401).json({
            msg : "Incorrect input format"
        })
    }
    try{
        const user =await User.findOne({email : body.email , password : body.password })
        
        if(user){
            const token = jwt.sign(user.email ,process.env.JWT_SECRET);
            
           return  res.status(200).json({
                name : user.name, 
                token : token
            })
        }else{
            return res.status(403).json({
                msg : "User doesn't exist !! please register first"
            })
        }

    }catch(e){
        return res.status(403).json({
            msg : "an error occured "
        })
    }
        
})

router.get('/' , authUserMiddleware ,async function(req : any , res : any){
    const userID = req.userID
    const user = await User.find({email: userID})
    try{
        const tasks = await Task.find({
            usersAssigned : user[0]._id
            })

        return res.status(200).json({
            tasks
        })
    }catch(e){
        res.status(403).json({
           msg :  "Error" + e
        })
    }
})

router.get('/all' ,authAdminMiddleware ,  async function(req: any , res : any){
    try {
        const users= await User.find()
       return  res.status(200).json({
                users
            })
    }catch(e){
        return res.status(403).json({
            msg : "Error " + e
        })
    }
})

export default router