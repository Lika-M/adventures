import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

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

export async function insertDocument(client: any, collectionName: any, document: any) {
    const db = client.db('adventures');
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    console.log(result)
    return result;
}