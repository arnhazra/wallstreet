import { AppEventMap } from "@/shared/constants/app-events.map"
import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { Cashflow } from "@/resources/cashflow/schemas/cashflow.schema"
import { GetByUserIdSchema } from "./cashflow.schema"

@Injectable()
export class CashflowAgent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public getCashflowsByUserIdTool = tool(
    async ({ userId }: { userId: string }) => {
      try {
        const cashflows: Cashflow[] = await this.eventEmitter.emitAsync(
          AppEventMap.FindCashFlowsByUserId,
          userId
        )

        return JSON.stringify(cashflows)
      } catch (error) {
        return "Unable to get the cashflow list"
      }
    },
    {
      name: "get_cashflows_list",
      description: "Get list of cashflows for a user",
      schema: GetByUserIdSchema,
    }
  )
}
