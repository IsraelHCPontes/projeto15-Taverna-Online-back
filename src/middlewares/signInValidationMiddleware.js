import  signInSchema from '../schemas/signInSchema.js';
import connectMongoDB from '../database/db.js';
import bcrypt from 'bcrypt';

export default async function signInValidation(req, res, next){
    const user = req.body;
    const validation = signInSchema.validate(user, {abortEarly: false});
    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(409).send(erros);
        return;
    } 

    try{
       const {db} = await connectMongoDB();
       const userAready =  await  db.collection("users").findOne({email:user.email})
       if(userAready && bcrypt.compareSync(user.password, userAready.password)){
        delete userAready.password
        res.locals.user = userAready;
        next();
       }else{
        res.status(401).send({message:'Email ou Senha incorreto'})
        return;
       }
    }catch(err){
        console.log(err)
        res.status(500).send({message: 'Deu erro no Midd'})
    }
};