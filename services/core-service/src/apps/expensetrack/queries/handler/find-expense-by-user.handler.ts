import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindExpensesByUserQuery } from "../impl/find-expense-by-user.query"
import { ExpenseRepository } from "../../expense.repository"
import {
  createOrConvertObjectId,
  QueryFilter,
} from "@/shared/entity/entity.schema"
import { Expense } from "../../schemas/expense.schema"

export function getCurrentMonthString(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return `${year}-${month}`
}

@QueryHandler(FindExpensesByUserQuery)
export class FindExpensesByUserQueryHandler implements IQueryHandler<FindExpensesByUserQuery> {
  constructor(private readonly repository: ExpenseRepository) {}

  async execute(query: FindExpensesByUserQuery) {
    const { userId, monthFilter, searchKeyword, expenseCategory } = query

    const matchStage: QueryFilter<Record<keyof Expense, any>> = {
      userId: createOrConvertObjectId(userId),
    }

    if (searchKeyword) {
      matchStage.title = { $regex: searchKeyword, $options: "i" }
    }

    if (expenseCategory) {
      matchStage.expenseCategory = expenseCategory
    }

    const selectedMonth = monthFilter ?? getCurrentMonthString()
    const [year, month] = selectedMonth.split("-").map(Number)
    const startStr = `${year}-${String(month).padStart(2, "0")}-01`
    const endDate = new Date(year, month, 1)
    const endStr = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}-01`
    matchStage.expenseDate = { $gte: startStr, $lt: endStr }

    const result = await this.repository.aggregate([
      { $match: matchStage },
      { $sort: { expenseDate: -1 } },
      {
        $group: {
          _id: null,
          total: { $sum: "$expenseAmount" },
          expenses: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          expenses: 1,
        },
      },
    ])

    return result[0] ?? { total: 0, expenses: [] }
  }
}
