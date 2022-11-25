import productSchema from '../schemas/productSchema.js';
import connectMongoDB from "../database/db.js";

export default async function productValidation(req, res, next){
    const product = req.body;
    const validation = productSchema.validate(product, {abortEarly: true});
    
    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(409).send(erros);
        return;
    };

    try{                
        const { db, client } = await connectMongoDB();
        const produtoExiste =  await  db.collection("products").findOne({name: product.name});
        if(produtoExiste){
            res.status(409).send("Produto já existe");
            return;
          };
        next();
    }catch(err){
        res.status(402).send(err);
    }   
}