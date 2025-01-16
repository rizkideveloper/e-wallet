import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { notFound,errorHandler } from './Middlewares/erorrMiddleware.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express();
const port = 3000;

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

import authRouter from './routes/authRouter.js'

//Parent Router
app.use("/api/v1/auth", authRouter)
app.use(notFound)
app.use(errorHandler)

//server
app.listen(port, () => {
  console.log(`Aplikasi ini berjalan di port sad ${port}`)
});

//Connecting DB
mongoose.connect(process.env.DATABASE,{

}).then(() => {
    console.log('Database Connected')
}).catch(()=>{})
