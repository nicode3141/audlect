//mock context for tRPC

import { db } from "~/server/db";


interface CreateContextOptions {

}

export async function createContextInner(_opts: CreateContextOptions){
    return {headers: new Headers(), auth: null as any, db: db};
}