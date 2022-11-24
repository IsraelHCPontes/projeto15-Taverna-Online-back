import signUpSchema from '../schemas/signUpSchema.js';
import connectMongoDB from "../database/db.js";

export default async function signUpValidation(req, res, next){
    const user = req.body;
    const validation = signUpSchema.validate(user, {abortEarly: false});
    
    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(409).send(erros);
        return;
    };

    try{                
        const { db, client } = await connectMongoDB();
        const emailExiste =  await  db.collection("users").findOne({email: user.email});
        if(emailExiste){
            res.status(409).send({message:"Email já existe"});
            return;
          };
        next();
    }catch(err){
        res.status(402).send(err);
    }   
}

