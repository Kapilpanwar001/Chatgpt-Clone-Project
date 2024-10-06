import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import colors from 'colors';
import dotenv from 'dotenv';
import  connectDB from './config/db.js';
import errorHandler from './middelwares/errorMiddleware.js';
import router from './routes/authRoutes.js';
import openaiRouter from './routes/openaiRoutes.js';

//routes path

dotenv.config()
   
// mongoDB connection
connectDB();

// rest object
const app = express();

// middlewares 
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(errorHandler);
const PORT = process.env.PORT || 8080;

//routes
app.use("'/api/v1/auth", router);
app.use('/api/v1/openai', openaiRouter);

//listen server
app.listen(8080,()=>{
    console.log(`Server is Running in ${process.env.DEV_MODE}mode on port number ${PORT}`.bgCyan.white)
});