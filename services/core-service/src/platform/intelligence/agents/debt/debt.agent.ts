import { AppEventMap } from "@/shared/constants/app-events.map"
import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { Debt } from "@/resources/debt/schemas/debt.schema"
import {
  CreateDebtSchema,
  GetByUserIdSchema,
  GetDebtListSchema,
} from "./debt.schema"

@Injectable()
export class DebtAgent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

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
        await this.eventEmitter.emitAsync(AppEventMap.CreateDebt, userId, {
          debtPurpose,
          identifier,
          startDate,
          endDate,
          principalAmount,
          interestRate,
        })
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
        const debts: Debt[] = await this.eventEmitter.emitAsync(
          AppEventMap.GetDebtList,
          userId,
          searchKeyword
        )

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
        const valuation = (
          await this.eventEmitter.emitAsync(AppEventMap.GetTotalDebt, userId)
        ).shift()
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
