import {MongoClient} from 'mongodb';

const uri = process.env.DATABASE_URL;
const options = {};

let mongoClient: MongoClient | null;

if (!process.env.DATABASE_URL) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export async function connectToDatabase() {
  try {
    if (mongoClient) {
      return {mongoClient};
    }
    if (!uri) {
      throw new Error('Mongo URI is undefined');
    }

    mongoClient = await new MongoClient(uri, options).connect();
    console.log('connected');
    return {mongoClient};
  } catch (err) {
    console.log(err);
    return {mongoClient: null};
  }
}
