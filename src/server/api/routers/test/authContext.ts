//mock context for tRPC

import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";

interface CreateContextOptions {

}

export async function createAuthContextInner(_opts: CreateContextOptions){
    return { 
        headers: new Headers(),
        auth: await auth(),
        db: db
    };
}