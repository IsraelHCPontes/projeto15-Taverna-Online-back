import { ObjectId } from 'mongodb';
import connectMongoDB from '../database/db.js'

const { db } = await connectMongoDB();

export async function showCart (req, res) {
    try{
        const products = await db.collection("cart").find().toArray();
        res.send(products);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }   
}

export async function addToCart (req, res) {
    try{
        const product = req.body;
        await db.collection("cart").insertOne(product);
        res.status(201).send("Produto colocado no carrinho!");
    }catch(err){
        console.error(err);
        res.sendStatus(422);
    }
}

export async function removeFromCart (req, res) {
    const {id} = req.params;

    try {
        await db.collection("cart").deleteOne({_id: new ObjectId(id)});
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}