import path from 'path'
import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app = express()
const port = process.env.PORT || 5000

const __dirname=path.resolve()

connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.use('/frontend',express.static(path.join(__dirname,"/frontend/dist")))

app.use('/admin',express.static(path.join(__dirname,"/admin/dist")))

app.get('/frontend/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/frontend/dist/index.html'))
})

app.get('/admin/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/admin/dist/index.html'))
})

app.get('*', (req, res) => {
    res.send('Welcome to the backend server.');
  });

// app.get('/',(req,res)=>{
//     res.send('Api Working')
// })

app.listen(port,()=>console.log("Server started",port))