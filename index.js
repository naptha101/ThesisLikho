import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/connectDb.js'
import cookieParser from 'cookie-parser'


const app=express()
app.use(cors())
app.use(cookieParser())
dotenv.config()
app.use(express.json())
connectDb()
//All the routers
import userRouter from './route/UserRoute.js'
import EnquiryRouter from './route/EnquiryRoute.js'
app.use('/api/auth',userRouter)
app.use('/api/enquiry',EnquiryRouter)


const PORT=process.env.PORT

app.listen(PORT,()=>{
    //  connectDb()
console.log("App is running on port",PORT)
})