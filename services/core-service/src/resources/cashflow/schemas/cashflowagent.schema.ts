import { z } from "zod"
import { FlowDirection, FlowFrequency } from "./cashflow.schema"

export const GetByUserIdSchema = z.object({
  userId: z.string().describe("user id of the user"),
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
  nextExecutionAt: z.string().describe("must be in YYYY-MM-DD format"),
})
