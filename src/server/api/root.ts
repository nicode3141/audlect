import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { votingsRouter } from "./routers/votings";
import { searchRouter } from "./routers/search";
import { likesRouter } from "./routers/likes";
import { songsRouter } from "./routers/songs";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  votings: votingsRouter,
  search: searchRouter,
  likes: likesRouter,
  songs: songsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
