import cartSchema from '../schemas/cartSchema.js';
import connectMongoDB from "../database/db.js";

export default async function cartValidation(req, res, next){
    const product = req.body;

    const validation = cartSchema.validate(product, {abortEarly: true});
    
    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(409).send(erros);
        return;
    };

    try{                
        const { db, client } = await connectMongoDB();
        const temNoCarrinho =  await  db.collection("cart").findOne({name: product.name});
        if(temNoCarrinho){
            res.status(409).send("Produto já está no carrinho!");
            return;
        };
        next();
    }catch(err){
        res.status(500).send(err);
    }
}