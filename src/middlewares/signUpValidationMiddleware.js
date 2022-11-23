import signUpSchema from '../schemas/signUpSchema.js';

export default async function signUpValidation(req, res, next){
    const user = req.body;
   
    const validation = signUpSchema.validate(user, {abortEarly: false})
    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(409).send(erros);
        return;
    }
    // res.locals.
    next();
}