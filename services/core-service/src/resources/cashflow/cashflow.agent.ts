import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import {
  CreateCashflowSchema,
  GetByUserIdSchema,
} from "./schemas/cashflowagent.schema"
import { CashFlowService } from "./cashflow.service"
import { AssetService } from "../asset/asset.service"

@Injectable()
export class CashflowAgent {
  constructor(
    private readonly service: CashFlowService,
    private readonly assetService: AssetService
  ) {}

  public getTargetAssetsTool = tool(
    async ({ userId }: { userId: string }) => {
      try {
        const assets = await this.assetService.findAssetsByTypes(userId, [
          "RETIREMENT",
          "LIQUID",
        ])

        return {
          success: true,
          data: assets.map((a) => ({
            id: a._id,
            name: a.assetName,
            type: a.assetType,
            value: a.currentValuation,
          })),
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to fetch target assets",
        }
      }
    },
    {
      name: "get_cashflow_target_assets",
      description:
        "Get list of eligible assets (RETIREMENT, LIQUID) to attach a cashflow",
      schema: GetByUserIdSchema,
    }
  )

  public createCashflowTool = tool(
    async (input) => {
      try {
        const { userId, ...rest } = input
        const result = await this.service.create(input.userId, rest)

        return {
          success: true,
          data: result,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Failed to create cashflow",
        }
      }
    },
    {
      name: "create_cashflow",
      description:
        "Create a cashflow linked to a specific asset (requires assetId)",
      schema: CreateCashflowSchema,
    }
  )

  public getCashflowsByUserIdTool = tool(
    async ({ userId }: { userId: string }) => {
      try {
        const cashflows = await this.service.findMyCashflows(userId)
        return {
          success: true,
          data: cashflows,
          error: null,
        }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: "Unable to get the cashflow list",
        }
      }
    },
    {
      name: "get_cashflows_list",
      description: "Get list of cashflows for a user",
      schema: GetByUserIdSchema,
    }
  )
}
