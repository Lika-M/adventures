import { MongoClient, ServerApiVersion, InsertOneResult, WithId, ObjectId } from 'mongodb';
import { cache } from 'react';

import { type User, type Adventure, type AdventureData, type AdventureDocument } from '@/types';

const uri = process.env.MONGODB_URI as string;
let client: MongoClient | null = null;

async function connectToDB() {
    if (!client) {
        client = new MongoClient(uri as string, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        await client.connect();
        console.log("Connected successfully to database");
    }
    return client;
}

process.on('exit', async () => {
    if (client) {
        await client.close();
        console.log("Database connection closed.");
    }
});

export async function insertDocument(
    collectionName: string,
    document: AdventureData | User
): Promise<InsertOneResult<Document>> {

    const client = await connectToDB();

    if (!client) {
        throw new Error('DB connection failed.')
    }
    const db = client.db('adventures');
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);

    return result;
}

export const getAllAdventures = cache(async function (): Promise<Adventure[]> {
    const client = await connectToDB();

    if (!client) {
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

    if (!adventures) {
        return [];
    }
    return adventures;
});

export async function getAdventureById(
    adventureId: string,
): Promise<WithId<any> | null> {
    const client = await connectToDB();
    if (!client) {
        throw new Error('DB connection failed.')
    }
    const db = client.db('adventures');
    const collection = db.collection('destinations');
    const objectId = new ObjectId(adventureId);
    const adventure = await collection.findOne({ _id: objectId });

    if (!adventure) {
        return null;
    }

    const { _id, ...rest } = adventure;
    return {
        ...rest,
        id: _id.toString()
    }
}

export async function findUser(
    collectionName: string,
    email: string
): Promise<WithId<any> | null> {
    const client = await connectToDB();
    if (!client) {
        throw new Error('DB connection failed.')
    }

    const db = client.db('adventures');
    const collection = db.collection(collectionName);
    const user = await collection.findOne({ email: email });

    if (!user) {
        return null;
    }
    const { _id, ...rest } = user;
    return {
        ...rest,
        id: _id.toString()
    }
}
