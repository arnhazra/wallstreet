import { z } from "zod"

export const CreateGoalSchema = z.object({
  userId: z.string().describe("user id of the user"),
  goalDate: z
    .string()
    .describe(
      `goal date; natural language allowed (e.g., "next Friday", "in 2 months", "2025-01-31") you need to convert to YYYY-MM-DD format string`
    ),
  goalAmount: z.coerce.number().describe("goal amount given by the user"),
})

export const GetByUserIdSchema = z.object({
  userId: z.string().describe("user id of the user"),
})
