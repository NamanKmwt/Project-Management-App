import express from "express";
const router = express.Router()
import z from 'zod'
import { authAdminMiddleware } from "../middleware/authAdmin.middleware";
import { Admin ,  Project,  Task, User, userInput } from "../db";



const inputSchema = z.object({
    title : z.string() , 
    description  : z.string(), 
    due_date : z.string().transform(val => new Date(val)), 
    status : z.string(), 
    priority : z.string(),
    todochecklist : z.array(z.string()), 
    usersAssigned : z.array(z.object({
        id: z.string(),
        name: z.string()
    }))
})


// using email for seleting the user 
router.post('/create' ,authAdminMiddleware ,async function(req :any  , res : any){
    const body = req.body
    const adminID = req.adminID
    const projectid= req.projectid;
    const valid = inputSchema.safeParse(body);
    if(!valid.success){
       return res.status(403).json({
            msg : `Incorrect inputs ${valid.error}` 
        })
    }
    const admin = await Admin.findOne({
        email : adminID
    })
    let usersAssignedID : string[]  = [];
    try{

        const usersAssigned : string[] = body.usersAssigned;
        usersAssigned.map((item: any)=>{
            usersAssignedID.push(item.id)
        })
        // usersAssignedID =await User.find(
        //     {email : {
        //         $in : usersAssigned
        //     }}, 
        //     {
        //         _id : 1
        //     }
        // )
    }catch(e){
        return res.status(403).json({
            msg : `${e}`
        })
    }
        
    const task = await Task.create({
        author : admin?._id, 
        title : body.title , 
        description : body.description , 
        due_date : body.due_date, 
        status : body.status, 
        priority : body.priority, 
        todochecklist : body.todochecklist, 
        usersAssigned : usersAssignedID
    })
    try{
        await Project.updateOne({_id : projectid} , 
            {
                $push : {
                    tasks : task._id
                }
            }
        )
    }catch(e){
        return res.status(403).json({
            msg : "error occured while adding task to project" + e
        })
    }

    if(task){
        return res.status(200).json({
            id : task._id
        })
    }

    
    res.status(403).json({
        msg : "error occured while creating task "
    })

})


router.put('/update' , authAdminMiddleware, async function(req :any  , res: any){
    const body = req.body;
    const postID = req.query.postID
    const valid = inputSchema.safeParse(body);
    if(!valid.success){
       return res.status(403).json({
            msg : `Incorrect inputs ${valid.error}` 
        })
    }

    let usersAssignedID : any ;
    try{

        const usersAssigned : string[] = body.usersAssigned;
        usersAssignedID =await User.find(
            {email : {
                $in : usersAssigned
            }}, 
            {
                _id : 1
            }
        )
    }catch(e){
        return res.status(403).json({
            msg : `${e}`
        })
    }

    try{

        await Task.updateOne({_id : postID} , 
        {
            title : body.title , 
            description : body.description , 
            due_date : body.due_date, 
            status : body.status, 
            priority : body.priority, 
            todochecklist : body.todochecklist, 
            usersAssigned : usersAssignedID
        }
        )
    }catch(e){
        return res.status(403).json({
            msg : "Error " + e
        })
    }

    res.status(200).json({
        msg : "Task updated successfully"
    })
})


router.delete('/deleteTask' , authAdminMiddleware, async function(req:any, res: any){
    const postID = req.query.postID;
    const projectid = req.projectid;

    try{
        await Task.deleteOne({_id : postID})
    }catch(e){
        return res.status(403).json({
            msg : "Error " + e
        })
    }

    try{
        await Project.updateOne({ _id : projectid} , 
            {
                $pull :{
                    tasks : postID
                }
            }
        )

    }catch(e){
        console.log("error while removing id from project")
    }

    res.status(200).json({
        msg : "Task deleted successfully"
    })

})

router.get('/' ,authAdminMiddleware ,  async function(req : any , res: any){
    const projectid = req.projectid
    try{
        const project = await Project.find({_id : projectid})
        
        const taskarray = project[0]["tasks"]

        
        const tasks =await Task.find({
            _id : {
                $in : taskarray
            }
        })
      

        const users:any = [];
        const userPromise =  tasks.map(async (item:any)=>{
            const data: any = await User.find({
                _id : {
                    $in : item['usersAssigned']
                }
            })
            users.push(data)
        })

        const allResults = await Promise.all(userPromise);
      

        res.status(200).json({
            users : users , 
            title : project[0].title, 
            description : project[0].description, 
            tasks : tasks
        })
    }catch(e){
        return res.status(403).json({
            msg : "Error " + e
        })
    }
})

export default router 