import { Module } from "@nestjs/common"
import { DebtModule } from "./debt/debt.module"
import { GoalModule } from "./goal/goal.module"
import { NewsModule } from "./news/news.module"
import { ExpenseModule } from "./expense/expense.module"
import { TaxModule } from "./tax/tax.module"
import { CashFlowModule } from "./cashflow/cashflow.module"
import { EventModule } from "./event/event.module"
import { EntityModule } from "@/shared/entity/entity.module"
import { config } from "@/config"
import { DbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import { AssetGroupModule } from "./assetgroup/assetgroup.module"
import { AssetModule } from "./asset/asset.module"

@Module({
  imports: [
    EntityModule.forRoot(
      config.AZURE_COSMOS_DB_CONNECTION_STRING,
      DbConnectionMap.Resource
    ),
    AssetGroupModule,
    AssetModule,
    ExpenseModule,
    GoalModule,
    DebtModule,
    CashFlowModule,
    EventModule,
    TaxModule,
    NewsModule,
  ],
})
export class ResourceModule {}
