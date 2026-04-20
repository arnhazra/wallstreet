import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import {
  CreateDebtSchema,
  GetByUserIdSchema,
  GetDebtListSchema,
} from "./schemas/debtagent.schema"
import { DebtService } from "./debt.service"

@Injectable()
export class DebtAgent {
  constructor(private readonly service: DebtService) {}

  public createDebtTool = tool(
    async ({
      userId,
      debtPurpose,
      identifier,
      startDate,
      endDate,
      principalAmount,
      interestRate,
    }: {
      userId: string
      debtPurpose: string
      identifier: string
      startDate: string
      endDate: string
      principalAmount: number
      interestRate: number
    }) => {
      try {
        const debtRequest = {
          debtPurpose,
          identifier,
          startDate,
          endDate,
          principalAmount,
          interestRate,
        }
        await this.service.createDebt(userId, debtRequest)
        return "Debt created successfully"
      } catch (error) {
        return "Failed to create the debt"
      }
    },
    {
      name: "create_debt",
      description: "Create a new debt for a user",
      schema: CreateDebtSchema,
    }
  )

  public getDebtListTool = tool(
    async ({
      userId,
      searchKeyword,
    }: {
      userId: string
      searchKeyword: string
    }) => {
      try {
        const debts = await this.service.findMyDebts(userId, searchKeyword)
        return JSON.stringify(debts)
      } catch (error) {
        return "Unable to get the debt list"
      }
    },
    {
      name: "get_debt_list",
      description: "List down all the debts for a user",
      schema: GetDebtListSchema,
    }
  )

  public getTotalDebtTool = tool(
    async ({ userId }: { userId: string }) => {
      try {
        const valuation = await this.service.calculateTotalDebt(userId)
        return `Total debt details is ${JSON.stringify(valuation)}`
      } catch (error) {
        return "Unable to get total debt"
      }
    },
    {
      name: "get_total_debt_by_userid",
      description: "Get total debt for a user",
      schema: GetByUserIdSchema,
    }
  )
}
