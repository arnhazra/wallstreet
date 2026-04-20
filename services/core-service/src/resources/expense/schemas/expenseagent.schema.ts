import { ExpenseCategory } from "@/shared/constants/types"
import { z } from "zod"

export const GetExpenseByMonthSchema = z.object({
  userId: z.string().describe("user id of the user"),
  expenseMonth: z
    .string()
    .describe(
      "calculate month given by the user - format should be like 2022-05"
    ),
})

export const CreateExpenseSchema = z.object({
  userId: z.string().describe("user id of the user"),
  title: z
    .string()
    .optional()
    .describe("expense purpose given by the user - optional"),
  expenseCategory: z
    .enum(ExpenseCategory)
    .describe(
      `category of the expense - you should decide based on description user gave, if not then ask`
    ),
  expenseAmount: z.coerce.number().describe("expense amount given by the user"),
  expenseDate: z
    .string()
    .describe(
      `expense date; natural language allowed (e.g., "next Friday", "in 2 months", "2025-01-31") you need to convert to YYYY-MM-DD format string`
    ),
})
