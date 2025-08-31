//mock context for tRPC

import { db } from "~/server/db";


type CreateContextOptions = object;

export async function createContextInner(_opts: CreateContextOptions){
    return {
        headers: new Headers(),
        auth: null,
        db: db
    };
}