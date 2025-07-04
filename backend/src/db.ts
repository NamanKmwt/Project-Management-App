import mongoose, { Schema } from "mongoose"
import dotenv from 'dotenv'
import { string } from "zod";
dotenv.config()

mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Connection error:", err.message));



const userSchema = new mongoose.Schema({
    email : {
        type : String , 
        unique : true 
        }, 
    name : String , 
    password : String , 
})

const adminSchema = new mongoose.Schema({
    email : {
        type : String , 
        unique : true 
        }, 
    name : String , 
    password : String , 
})



const taskSchema = new mongoose.Schema({
    author : {
        type : Schema.Types.ObjectId, 
        ref : 'Admin'
    },
    title : String , 
    description : String , 
    due_date : Date , 
    status : {
        type : String, 
        enum : ['TODO' , 'IN PROGRESS' , 'DONE']
    }, 
    priority : {
        type : String , 
        enum : ['HIGH' , 'MEDIUM' , 'LOW']
    }, 
    todochecklist : [String], 
    usersAssigned : [{
        type : Schema.Types.ObjectId, 
        ref : 'User'
    }]
})


const projectSchema = new mongoose.Schema({
    author : {
        type : Schema.Types.ObjectId, 
        ref : 'Admin'
    }, 
    title : String , 
    description : String , 
    tasks : [{
        type : Schema.Types.ObjectId, 
        ref : 'Task'
    }]
})


const User = mongoose.model('User' , userSchema);
const Task = mongoose.model('Task' , taskSchema);
const Admin = mongoose.model('Admin' , adminSchema);
const Project = mongoose.model('Project' , projectSchema)

type userInput = typeof User

export {
    User , Task , Admin , Project , userInput 
}