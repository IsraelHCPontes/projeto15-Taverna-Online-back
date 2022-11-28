import connectMongoDB from '../database/db.js'

const { db } = await connectMongoDB();

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
        await db.collection("products").insertOne(product);
        res.status(201).send("Produto cadastrado com sucesso!");
    }catch(err){
        console.error(err);
        res.sendStatus(422);
    }
}

export async function getProductsCart(req, res){
    const { _id } = res.locals.user;
    try{
        const productsCart = await db.collection("cart").find({userId: _id}).toArray();
        res.status(200).send(productsCart)
    }catch(error){
        res.status(500).send(error)
    }
}