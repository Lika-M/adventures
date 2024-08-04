import { ObjectId } from 'mongodb';

export type AdventureData = {
    image: string,
    title: string,
    address: string,
    description: string,
    createdAt: string
}

export type AdventureDocument = AdventureData & {
    _id: ObjectId,
}

export type Adventure = {
    id: string,
    image: string,
    title: string,
    address: string,
    description: string,
    createdAt: string
}