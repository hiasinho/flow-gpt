import { createTRPCRouter } from "~/server/api/trpc";
import { openaiRouter } from "./routers/openai";

export const appRouter = createTRPCRouter({
  openai: openaiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
