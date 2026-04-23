import { Module } from "@nestjs/common"
import { WidgetService } from "./widget.service"
import { WidgetController } from "./widget.controller"
import { AuthModule } from "@/auth/auth.module"
import { AssetModule } from "@/resources/asset/asset.module"
import { DebtModule } from "@/resources/debt/debt.module"
import { GoalModule } from "@/resources/goal/goal.module"
import { ExpenseModule } from "@/resources/expense/expense.module"

@Module({
  imports: [AuthModule, AssetModule, DebtModule, GoalModule, ExpenseModule],
  controllers: [WidgetController],
  providers: [WidgetService],
})
export class WidgetModule {}
