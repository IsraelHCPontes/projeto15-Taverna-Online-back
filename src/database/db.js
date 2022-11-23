import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let cachedDb;

const client = new MongoClient(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connectMongoDB() {
  if (cachedDb) {
    return { db: cachedDb, client };
  }

  await client.connect();

   const db = client.db(process.env.MONGO_DB);
   cachedDb = db;
   
  return { db, client };
}
//exemple
//import connectMongoDB from '../database/db.js'
//const { db } = await connectMongoDB();
