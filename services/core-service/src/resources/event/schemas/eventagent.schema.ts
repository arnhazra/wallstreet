import { z } from "zod"

export const GetEventByMonthSchema = z.object({
  userId: z.string().describe("user id of the user"),
  eventMonth: z
    .string()
    .describe(
      "calculate month given by the user - format should be like 2022-05"
    ),
})

export const CreateEventSchema = z.object({
  userId: z.string().describe("user id of the user"),
  eventName: z.string().describe("event purpose given by the user"),
  eventDate: z
    .string()
    .describe(
      `event date; natural language allowed (e.g., "next Friday", "in 2 months", "2025-01-31") you need to convert to YYYY-MM-DD format string`
    ),
})
