import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//Configs;
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5001;

app.listen(port,() =>  {
    console.log(`Server runing on port ${port}`);
});



