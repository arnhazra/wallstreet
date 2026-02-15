export enum AppEventMap {
  // General Events
  CreateAnalytics = "createAnalytics",
  GetUserDetails = "getUserDetails",
  // AssetManager Events
  CreateSpace = "createSpace",
  GetSpaceList = "getSpaceList",
  GetTotalAsset = "getTotalAsset",
  FindAssetById = "findAssetbyId",
  UpdateAssetById = "updateAssetById",
  GetAssetList = "getAssetList",
  // DebtTrack Events
  CreateDebt = "createDebt",
  GetTotalDebt = "getTotalDebt",
  GetDebtList = "getDebtList",
  // Goal Events
  CreateGoal = "createGoal",
  GetGoalList = "getGoalList",
  GetNearestGoal = "getNearestGoal",
  // ExpenseTrack Events
  GetExpenseByMonth = "getExpenseByMonth",
  CreateExpense = "createExpense",
  //CashFlow Events
  FindCashFlowsByUserId = "findCashFlowsByUserId",
}
