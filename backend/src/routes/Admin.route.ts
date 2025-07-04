import express from "express";
const router = express.Router();
import z from 'zod'
import { Admin } from "../db";
const jwt = require('jsonwebtoken')
require('dotenv').config()

const inputSchema = z.object({
    email : z.string().email(), 
    password : z.string().min(8)
})

router.post('/signin' , async function(req : any, res : any){
    const body = req.body
    const {success} = inputSchema.safeParse(body)
    if(!success){
        return res.status(403).json({
            msg : "Incorrect inputs"
        })
    }
    try{
        const admin =await Admin.findOne({
            email : body.email , 
            password : body.password
        })
        if(admin){
            const token = jwt.sign(admin.email , process.env.JWT_SECRET)
            return res.status(200).json({
                name : admin.name , 
                token : token
            })

        }else{
            return res.status(403).json({
                
                msg : "User doesn't exist !! please register first"
            })

        }

    }catch(e){
        return res.status(403).json({
            msg : e
        })
    }
})


export default router