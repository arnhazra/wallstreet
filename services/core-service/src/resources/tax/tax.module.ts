import { Module } from "@nestjs/common"
import { TaxService } from "./tax.service"
import { TaxController } from "./tax.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { DbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import { Thread, ThreadSchema } from "./schemas/thread.schema"
import { CreateThreadCommandHandler } from "./commands/handler/create-thread.handler"
import { TaxRepository } from "./tax.repository"
import { EntityModule } from "@/shared/entity/entity.module"
import { FetchThreadByIdQueryHandler } from "./queries/handler/fetch-thread-by-id.handler"
import { FetchThreadsByUserIdQueryHandler } from "./queries/handler/fetch-threads-by-user-id.handler"
import { HttpModule } from "@nestjs/axios"
import { TaxStrategy } from "./tax.strategy"
import { config } from "@/config"

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    EntityModule.forFeature(
      [{ name: Thread.name, schema: ThreadSchema }],
      DbConnectionMap.Resource
    ),
  ],
  controllers: [TaxController],
  providers: [
    TaxService,
    TaxRepository,
    TaxStrategy,
    CreateThreadCommandHandler,
    FetchThreadByIdQueryHandler,
    FetchThreadsByUserIdQueryHandler,
  ],
})
export class TaxModule {}
