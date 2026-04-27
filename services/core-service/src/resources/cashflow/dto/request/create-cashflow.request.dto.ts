import { z } from "zod"
import { createZodDto } from "nestjs-zod"
import { FlowDirection, FlowFrequency } from "../../schemas/cashflow.schema"
import { dateString } from "@/shared/validators/zod.validators"
import { BaseAgentSchema } from "@/intelligence/agent/agent.schema"

export const CreateCashFlowSchema = z.object({
  description: z.string().min(1).describe("description of cash flow"),
  targetAsset: z.string().min(1).describe("target asset id"),
  flowDirection: z
    .enum(FlowDirection)
    .describe("decide if cash comes in or goes out"),
  amount: z.number().describe("decide if cash comes in or goes out"),
  frequency: z.enum(FlowFrequency).describe("Frequency of cash flow"),
  nextExecutionAt: dateString.describe(
    "next execution date - must be a future date; natural language allowed (e.g., Next Friday, in 2 months, 2025-01-31) you need to convert to YYYY-MM-DD format string"
  ),
})

export const CreateCashflowServiceSchema = BaseAgentSchema.extend(
  CreateCashFlowSchema.shape
)

export class CreateCashFlowRequestDto extends createZodDto(
  CreateCashFlowSchema
) {}
