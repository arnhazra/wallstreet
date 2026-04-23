import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import { z } from "zod"
import {
  CreateExpenseSchema,
  GetExpenseByMonthSchema,
} from "../../../../resources/expense/schemas/expenseagent.schema"
import { ExpenseService } from "../../../../resources/expense/expense.service"
import { ExpenseCategory } from "@/shared/constants/types"

@Injectable()
export class ExpenseAgent {
  constructor(private readonly service: ExpenseService) {}

  public getExpenseCategoriesTool = tool(
    async () => Object.values(ExpenseCategory),
    {
      name: "get_expense_categories",
      description: "Get expense categories",
      schema: z.object({}),
    }
  )

  public getExpenseByMonthTool = tool(
    async (input) => {
      try {
        const { userId, expenseMonth } = input
        const expenses = await this.service.findMyExpenses(userId, expenseMonth)
        return {
          success: true,
          data: expenses,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get the expense list",
        }
      }
    },
    {
      name: "get_expenses_by_month",
      description: "List down expenses for an user for any given month",
      schema: GetExpenseByMonthSchema,
    }
  )

  public createExpenseTool = tool(
    async (input) => {
      try {
        const { userId, title, expenseAmount, expenseCategory, expenseDate } =
          input
        await this.service.createExpense(userId, {
          title,
          expenseAmount,
          expenseCategory,
          expenseDate,
        })
        return {
          success: true,
          data: "Expense created successfully",
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Failed to create the expense",
        }
      }
    },
    {
      name: "create_expense",
      description: "Create a new expense for a user",
      schema: CreateExpenseSchema,
    }
  )
}
