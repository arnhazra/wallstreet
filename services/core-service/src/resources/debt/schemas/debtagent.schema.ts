import { z } from "zod"

export const GetDebtListInputSchema = z.object({
  userId: z.string().describe("user id of the user"),
  searchKeyword: z
    .string()
    .optional()
    .describe("debt name given by the user to search - this is optional"),
})

export const CreateDebtInputSchema = z.object({
  userId: z.string().describe("user id of the user"),
  debtPurpose: z.string().describe("debt purpose given by the user"),
  identifier: z.string().describe("identifier given by the user"),
  startDate: z
    .string()
    .describe(
      `start date; natural language allowed (e.g., "next Friday", "in 2 months", "2025-01-31") you need to convert to YYYY-MM-DD format string`
    ),
  endDate: z
    .string()
    .describe(
      `end date; natural language allowed (e.g., "next Friday", "in 2 months", "2025-01-31") you need to convert to YYYY-MM-DD format string`
    ),
  principalAmount: z.coerce
    .number()
    .describe("principal amount given by the user"),
  interestRate: z.coerce.number().describe("interest rate % given by the user"),
})
