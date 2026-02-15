import { Module } from "@nestjs/common"
import { AssetManagerModule } from "./assetmanager/assetmanager.module"
import { DebtTrackModule } from "./debttrack/debttrack.module"
import { GoalModule } from "./goal/goal.module"
import { DiscoverModule } from "./discover/discover.module"
import { ExpenseTrackModule } from "./expensetrack/expensetrack.module"
import { TaxAdvisorModule } from "./taxadvisor/taxadvisor.module"
import { CashFlowModule } from "./cashflow/cashflow.module"
import { PlannerModule } from "./planner/planner.module"

@Module({
  imports: [
    AssetManagerModule,
    DebtTrackModule,
    ExpenseTrackModule,
    GoalModule,
    DiscoverModule,
    TaxAdvisorModule,
    CashFlowModule,
    PlannerModule,
  ],
})
export class AppsModule {}
