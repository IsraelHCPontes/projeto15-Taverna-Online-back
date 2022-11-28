import connectMongoDB from '../database/db.js'
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

export async function signUp (req, res) {
    const user = req.body;
    const passwordHash =  bcrypt.hashSync(user.password, 10);
    const newBody = {
        name: user.name,
        email: user.email,
        image: user.image,
        password: passwordHash
       }

    try{                
        const { db } = await connectMongoDB();
        await  db.collection("users").insertOne(newBody); 
        res.status(201).send({message:"Usuário cadastrado com sucesso"})
    }catch(err){
        res.status(422).send(err);
    }   
}

export  async function signIn(req, res) {
    const {user} = res.locals;
    const token = uuid();
    const newSession = {
        userId: user._id,
        token:token,
        time:Date.now()
    }
    console.log(user, token);
    
    try{
        const { db } = await connectMongoDB();
        
        const sessionAlready = await  db.collection("sessions").findOne({userId: user._id});

        if(sessionAlready){
            await  db.collection("sessions").deleteOne({userId: user._id});
        }
        await  db.collection("sessions").insertOne(newSession);
        res.status(201).send({token: token, name: user.name});
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

export  async function getUser(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    
    if (!token) {
        return res.sendStatus(401);
    }
  
    try {
        const sessions = await db.collection("sessions").findOne({ token });
        console.log(sessions);

        const user = await db.collection("users").findOne({ _id: sessions?.userId });
        delete user.password;

        res.send(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}