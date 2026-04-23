import { FlowDirection, FlowFrequency } from "./cashflow.schema"
import { z } from "zod"

export const FindCashflowsSchema = z.object({
  userId: z.string().describe("user id of the user"),
  searchKeyword: z
    .string()
    .optional()
    .describe("optional param if user provide cashflow name"),
})

export const CreateCashflowSchema = z.object({
  userId: z.string().describe("user id of the user"),
  targetAsset: z.string().describe("target asset id"),
  description: z.string().describe("user id of the user"),
  flowDirection: z
    .enum(FlowDirection)
    .describe("decide if cash comes in or goes out"),
  amount: z.coerce.number(),
  frequency: z.enum(FlowFrequency).describe("Frequency of cash flow"),
  nextExecutionAt: z
    .string()
    .describe(
      `next execution date - must be a future date; natural language allowed (e.g., "next Friday", "in 2 months", "2025-01-31") you need to convert to YYYY-MM-DD format string`
    ),
})
