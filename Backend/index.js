import express from 'express';
import ConnectToDB from './db.js';
import authRouter from './routes/authRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app  = express();
const port = process.env.PORT;
ConnectToDB();

app.use(cors());
app.use('auth',authRouter);

app.get('/',(req,res)=>{
    res.send({Blood_Donation : 'Welcome to blood donation backend'});
});

app.listen(port,()=>{
    console.log(`Server is Running on http://localhost:${port}/`);
});