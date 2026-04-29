import { z } from "zod"
import { createZodDto } from "nestjs-zod"
import { dateString } from "@/shared/validators/zod.validators"
import { BaseAgentSchema } from "@/intelligence/agent/agent.schema"

const CreateGoalSchema = z.object({
  goalDate: dateString.describe(
    `goal date; natural language allowed (e.g., "next Friday", "in 2 months", "2025-01-31") you need to convert to YYYY-MM-DD format string`
  ),
  goalAmount: z.number().positive().describe("goal amount given by the user"),
})

export const CreateGoalServiceSchema = BaseAgentSchema.extend(
  CreateGoalSchema.shape
)

export class CreateGoalRequestDto extends createZodDto(CreateGoalSchema) {}
