import { Module } from "@nestjs/common"
import { AssetManagerModule } from "./assetmanager/assetmanager.module"
import { DebtTrackModule } from "./debttrack/debttrack.module"
import { WealthPlannerModule } from "./wealthplanner/wealthplanner.module"
import { DiscoverModule } from "./discover/discover.module"
import { ExpenseTrackModule } from "./expensetrack/expensetrack.module"
import { TaxAdvisorModule } from "./taxadvisor/taxadvisor.module"
import { CashFlowModule } from "./cashflow/cashflow.module"
import { CalendarModule } from "./calendar/calendar.module"

@Module({
  imports: [
    AssetManagerModule,
    DebtTrackModule,
    ExpenseTrackModule,
    WealthPlannerModule,
    DiscoverModule,
    TaxAdvisorModule,
    CashFlowModule,
    CalendarModule,
  ],
})
export class AppsModule {}
