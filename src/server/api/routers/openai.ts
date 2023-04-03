import { generate } from "@l/openai";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const openaiRouter = createTRPCRouter({
  chatCompletion: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await generate(input.prompt);
      return result ? result : "I don't have an answer for you";
    }),
});
