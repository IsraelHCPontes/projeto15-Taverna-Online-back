import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/authRouter.js';

//Configs;
const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
dotenv.config();

const port = process.env.PORT || 5001;

app.listen(port,() =>  {
    console.log(`Server runing on port ${port}`);
});



