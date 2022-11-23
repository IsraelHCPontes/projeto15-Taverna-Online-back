import  newTransactionSchema  from "../schemas/newTransactionSchema.js";
import joi from '../schemas/newTransactionSchema.js'

export async function newTransactionValidationMiddleware(req, res, next){
    const user = req.body;
    const validation = newTransactionSchema.validate(user);
    if(validation.error){
        const erros =  validation.error.details.map(detail => detail)
        res.status(500).send(erros)
    }
    next();
}