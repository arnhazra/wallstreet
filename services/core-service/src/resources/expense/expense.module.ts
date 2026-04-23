import { Module } from "@nestjs/common"
import { EntityModule } from "@/shared/entity/entity.module"
import { DbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import { ExpenseService } from "./expense.service"
import { ExpenseController } from "./expense.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { Expense, ExpenseSchema } from "./schemas/expense.schema"
import { ExpenseRepository } from "./expense.repository"
import { CreateExpenseCommandHandler } from "./commands/handler/create-expense.handler"
import { DeleteExpenseCommandHandler } from "./commands/handler/delete-expense.handler"
import { FindExpenseByIdQueryHandler } from "./queries/handler/find-expense-by-id.handler"
import { UpdateExpenseCommandHandler } from "./commands/handler/update-expense.handler"
import { FindExpensesByUserQueryHandler } from "./queries/handler/find-expense-by-user.handler"

@Module({
  imports: [
    CqrsModule,
    EntityModule.forFeature(
      [{ name: Expense.name, schema: ExpenseSchema }],
      DbConnectionMap.Resource
    ),
  ],
  controllers: [ExpenseController],
  providers: [
    ExpenseService,
    ExpenseRepository,
    CreateExpenseCommandHandler,
    UpdateExpenseCommandHandler,
    DeleteExpenseCommandHandler,
    FindExpensesByUserQueryHandler,
    FindExpenseByIdQueryHandler,
  ],
  exports: [ExpenseService],
})
export class ExpenseModule {}
