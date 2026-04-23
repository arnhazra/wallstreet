import {
  Asset,
  Cashflow,
  Debt,
  Goal,
  AssetGroup,
} from "@/shared/constants/types"

export enum ResourceType {
  ASSET = "asset",
  ASSETGROUP = "Asset Group",
  DEBT = "debt",
  GOAL = "goal",
  EXPENSE = "expense",
  CASHFLOW = "cashflow",
  CALENDAR_EVENT = "event",
}

export type ResourceTypeMap = {
  [ResourceType.ASSET]: Asset
  [ResourceType.ASSETGROUP]: AssetGroup
  [ResourceType.DEBT]: Debt
  [ResourceType.GOAL]: Goal
  [ResourceType.CASHFLOW]: Cashflow
}

export const createResourceUrlMap: Partial<Record<ResourceType, string>> = {
  [ResourceType.ASSET]: "/apps/assetmanager/asset/create",
  [ResourceType.DEBT]: "/apps/debttrack/createoreditdebt",
  [ResourceType.ASSETGROUP]: "/apps/assetmanager/createoreditassetgroup",
  [ResourceType.GOAL]: "/apps/wealthplanner/createoreditgoal",
  [ResourceType.EXPENSE]: "/apps/expensetrack/createoreditexpense",
  [ResourceType.CASHFLOW]: "/apps/cashflow/createoreditcashflow",
}
