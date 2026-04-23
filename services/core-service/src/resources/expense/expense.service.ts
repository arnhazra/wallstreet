import { Injectable } from "@nestjs/common"
import { statusMessages } from "@/shared/constants/status-messages"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { Expense } from "./schemas/expense.schema"
import { DeleteExpenseCommand } from "./commands/impl/delete-expense.command"
import { CreateExpenseCommand } from "./commands/impl/create-expense.command"
import { CreateExpenseRequestDto } from "./dto/request/create-expense.request.dto"
import { UpdateExpenseCommand } from "./commands/impl/update-expense.command"
import { FindExpensesByUserQuery } from "./queries/impl/find-expense-by-user.query"
import { FindExpenseByIdQuery } from "./queries/impl/find-expense-by-id.query"
import { ExpenseCategory } from "@/shared/constants/types"
import { z } from "zod"
import { AgentTool } from "@/intelligence/agent/agent.decorator"
import {
  CreateExpenseSchema,
  GetExpensesByUserSchema,
} from "./schemas/expenseagent.schema"

@Injectable()
export class ExpenseService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @AgentTool({
    name: "get_expense_categories",
    description: "Get expense categories",
  })
  public getExpenseCategories() {
    return Object.values(ExpenseCategory)
  }

  @AgentTool({
    name: "create_expense",
    description: "Create a new expense for a user",
    schema: CreateExpenseSchema,
  })
  async createExpense(dto: z.output<typeof CreateExpenseSchema>) {
    try {
      const { userId, ...rest } = dto
      return await this.commandBus.execute<CreateExpenseCommand, Expense>(
        new CreateExpenseCommand(userId, { ...rest })
      )
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }

  @AgentTool({
    name: "get_expenses_by_month",
    description: "List down expenses for an user for any given month",
    schema: GetExpensesByUserSchema,
  })
  async findMyExpenses(dto: z.output<typeof GetExpensesByUserSchema>) {
    try {
      const { userId, monthFilter, searchKeyword, expenseCategory } = dto
      return await this.queryBus.execute<FindExpensesByUserQuery>(
        new FindExpensesByUserQuery(
          userId,
          monthFilter,
          searchKeyword,
          expenseCategory
        )
      )
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }

  async findExpenseById(reqUserId: string, expenseId: string) {
    try {
      return await this.queryBus.execute<FindExpenseByIdQuery, Expense>(
        new FindExpenseByIdQuery(reqUserId, expenseId)
      )
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }

  async updateExpenseById(
    userId: string,
    expenseId: string,
    requestBody: CreateExpenseRequestDto
  ) {
    try {
      return await this.commandBus.execute<UpdateExpenseCommand, Expense>(
        new UpdateExpenseCommand(userId, expenseId, requestBody)
      )
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }

  async deleteExpense(reqUserId: string, expenseId: string) {
    try {
      const { userId } = await this.queryBus.execute<
        FindExpenseByIdQuery,
        Expense
      >(new FindExpenseByIdQuery(reqUserId, expenseId))
      if (userId.toString() === reqUserId) {
        await this.commandBus.execute(new DeleteExpenseCommand(expenseId))
        return { success: true }
      }

      throw new Error(statusMessages.connectionError)
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }
}
