import connectMongoDB from '../database/db.js'

export async function tokenValidation(req, res, next){
  const {authorization} = req.headers;
  const token = authorization?.replace('Bearer ', ''); 

  try{
    const {db} = await connectMongoDB();
    const session = await  db.collection("sessions").findOne({token})
    if(!session){
        res.sendStatus(401);
        return;
    }
    const user = await  db.collection("users").findOne({_id: session.userId });
    if(!user){
        res.sendStatus(401);
        return;
    }
    res.locals.user = user;
    next();
  }catch({response}){
    console.log(response)
  }}
