import { Module } from "@nestjs/common"
import { EntityModule } from "@/shared/entity/entity.module"
import { DbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import { CqrsModule } from "@nestjs/cqrs"
import { EventService } from "./event.service"
import { EventController } from "./event.controller"
import { Event, EventSchema } from "./schemas/event.schema"
import { EventRepository } from "./event.repository"
import { CreateEventCommandHandler } from "./commands/handler/create-event.handler"
import { DeleteEventCommandHandler } from "./commands/handler/delete-event.handler"
import { FindEventsByUserQueryHandler } from "./queries/handler/find-event-by-user.handler"
import { FindEventByIdQueryHandler } from "./queries/handler/find-event-by-id.handler"
import { UpdateEventByIdCommandHandler } from "./commands/handler/update-event.handler"
import { AuthModule } from "@/auth/auth.module"
import { AssetModule } from "../asset/asset.module"
import { DebtModule } from "../debt/debt.module"
import { CashFlowModule } from "../cashflow/cashflow.module"
import { GoalModule } from "../goal/goal.module"
import { ExpenseModule } from "../expense/expense.module"

@Module({
  imports: [
    AuthModule,
    AssetModule,
    DebtModule,
    CashFlowModule,
    GoalModule,
    ExpenseModule,
    CqrsModule,
    EntityModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      DbConnectionMap.Resource
    ),
  ],
  controllers: [EventController],
  providers: [
    EventService,
    EventRepository,
    CreateEventCommandHandler,
    DeleteEventCommandHandler,
    FindEventsByUserQueryHandler,
    FindEventByIdQueryHandler,
    UpdateEventByIdCommandHandler,
  ],
  exports: [EventService],
})
export class EventModule {}
