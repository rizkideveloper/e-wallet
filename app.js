import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { notFound,errorHandler } from './middlewares/erorrMiddleware.js'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'

dotenv.config()

const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(helmet())
app.use(ExpressMongoSanitize())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

import authRouter from './routes/authRouter.js'
import TransacionRouter from './routes/TransactionRouter.js'

//Parent Router
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/transaction", TransacionRouter)

app.use(notFound)
app.use(errorHandler)

//server
app.listen(port, () => {
  console.log(`Aplikasi ini berjalan di port ${port}`)
});

//Connecting DB
mongoose.connect(process.env.DATABASE,{

}).then(() => {
    console.log('Database Connected')
}).catch(()=>{})
