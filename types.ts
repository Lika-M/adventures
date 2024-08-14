import { ObjectId } from 'mongodb';

export type AdventureData = {
    image: string,
    title: string,
    address: string,
    description: string,
    creator: string | null | undefined,
    createdAt: string
}

export type AdventureDocument = AdventureData & {
    _id: ObjectId,
}

export type Adventure = AdventureData & {
    id: string,
}

export type UserData = {
    email: string,
    password: string
}

export type User = UserData & {
    createdAt: string
}

