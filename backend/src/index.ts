import express from 'express'
import userRouter from './routes/User.route'
import adminRouter from './routes/Admin.route'
import taskRouter from './routes/Task.route'
import projectRouter from './routes/Project.route'
require('dotenv').config()
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/user' , userRouter )
app.use('/api/v1/admin' , adminRouter)
app.use('/api/v1/project', projectRouter)



app.listen(process.env.PORT ,function(){
    console.log("app is working")
} )