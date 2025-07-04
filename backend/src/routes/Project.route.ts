import  express, { NextFunction } from "express"
import z from 'zod'
import taskRouter from './Task.route'
import { authAdminMiddleware } from "../middleware/authAdmin.middleware"
import { Admin, Project } from "../db"
const router = express.Router()



const inputSchema = z.object({
    title : z.string() , 
    description : z.string()
})

router.post('/create' , authAdminMiddleware , async function(req : any , res : any){
        const adminID = req.adminID
        const body = req.body
        const {success } = inputSchema.safeParse(body)

        const admin = await Admin.findOne({
                email : adminID
            })

        if(!success){
            return res.status(403).json({
                msg : "incorrect inputs"
            })
        }

        const project = await Project.create({
            author : admin?._id, 
            title : body.title , 
            description : body.description, 
            tasks : []
        })
        if(!project){
            return res.status(403).json({
                msg : "Error occured during project creation"
            })
        }

        return res.status(200).json({
            msg : "project created successfully"
        })
})



router.put('/update' , authAdminMiddleware , async function(req : any, res : any){
        const body = req.body
        const projectID = req.query.projectID
        const {success } = inputSchema.safeParse(body)

        if(!success){
            return res.status(403).json({
                msg : "incorrect inputs"
            })
        }
        if(!success){
            return res.status(403).json({
                msg : "incorrect inputs"
            })
        }

        const project = await Project.updateOne(  {
            _id : projectID
        }, {
            title : body.title , 
            description : body.description
        })

        if(!project){
            return res.status(403).json({
                msg : "Error occured during project creation"
            })
        }

        res.status(200).json({
            msg : "project updated successfully"
        })
})

router.delete('/deleteProject' , authAdminMiddleware ,  async function(req : any , res : any){
    const projectID = req.body.projectID

    try{
        await Project.deleteOne({_id : projectID})
    }catch(e){
        return res.status(403).json({
            msg : "Error " + e
        })
    }

    res.status(200).json({
        msg : "Task deleted successfully"
    })
})

router.get('/' , authAdminMiddleware , async function(req : any , res: any){
    try{
        const Projects = await Project.find()
        return res.status(200).json({
            Projects
        })
    }catch(e){
        return res.status(403).json({
            msg : "Error " + e
        })
    }
})


export async function projectIDMiddleware(req : any , res: any , next : NextFunction){
    const projectID = req.params['id']
  
    const project = await Project.findOne({_id : projectID})
    
    req.projectid = project?._id
    if(project){
        return next()
    }
    res.status(403).json({
        msg : "project doesn't exist"
    })
}


router.use("/:id"  , projectIDMiddleware  , taskRouter)

export default router