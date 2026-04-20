import { ExpenseCategory } from "@/shared/constants/types"
import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import {
  CreateExpenseSchema,
  GetExpenseByMonthSchema,
} from "./schemas/expenseagent.schema"
import { ExpenseService } from "./expense.service"

@Injectable()
export class ExpenseAgent {
  constructor(private readonly service: ExpenseService) {}

  public getExpenseByMonthTool = tool(
    async ({
      userId,
      expenseMonth,
    }: {
      userId: string
      expenseMonth: string
    }) => {
      try {
        const expenses = await this.service.findMyExpenses(userId, expenseMonth)
        return JSON.stringify(expenses)
      } catch (error) {
        return "Unable to get the expense list"
      }
    },
    {
      name: "get_expenses_by_month",
      description: "List down expenses for an user for any given month",
      schema: GetExpenseByMonthSchema,
    }
  )

  public createExpenseTool = tool(
    async ({
      userId,
      title,
      expenseAmount,
      expenseCategory,
      expenseDate,
    }: {
      userId: string
      title: string
      expenseAmount: number
      expenseCategory: ExpenseCategory
      expenseDate: string
    }) => {
      try {
        await this.service.createExpense(userId, {
          title,
          expenseAmount,
          expenseCategory,
          expenseDate,
        })
        return "Expense created successfully"
      } catch (error) {
        return "Failed to create the expense"
      }
    },
    {
      name: "create_expense",
      description: "Create a new expense for a user",
      schema: CreateExpenseSchema,
    }
  )
}
