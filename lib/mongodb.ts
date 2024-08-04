import { MongoClient, ServerApiVersion, InsertOneResult, ObjectId } from 'mongodb';

import { type Adventure, AdventureData, AdventureDocument } from '@/types';


const uri = process.env.MONGODB_URI as string;

export async function connectToDB() {
    const client = new MongoClient(uri as string, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();
    console.log("Connected successfully to database");
    return client;

}

export async function insertDocument(
    client: MongoClient,
    collectionName: string,
    document: AdventureData
): Promise<InsertOneResult<Document>> {
    const db = client.db('adventures');
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    return result;
}

export async function getAllAdventures(): Promise<Adventure[]> {
    const client = await connectToDB();
    if(!client){
        throw new Error('DB connection failed.')
    }
    const db = client.db('adventures');
    const collection = db.collection<AdventureDocument>('destinations');
    const result = await collection.find().sort({ createdAt: -1 }).toArray();

    const adventures = result.map(adventure => {
        const { _id, ...rest } = adventure;
        return {
            ...rest,
            id: _id.toString()
        }
    });

    return adventures;
}