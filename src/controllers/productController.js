import connectMongoDB from '../database/db.js'

export async function showProducts (req, res) {
    try{
        const products = await db.collection("products").find().toArray();
        res.send(products);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }   
}

export async function createProduct (req, res) {
    try{
        const product = req.body;
        const { db } = await connectMongoDB();
        await db.collection("products").insertOne(product);
        res.status(201).send("Produto cadastrado com sucesso!");
    }catch(err){
        console.error(err);
        res.sendStatus(422);
    }
}