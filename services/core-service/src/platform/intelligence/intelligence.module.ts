import { Module } from "@nestjs/common"
import { IntelligenceService } from "./intelligence.service"
import { IntelligenceController } from "./intelligence.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { DbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import { Thread, ThreadSchema } from "./schemas/thread.schema"
import { CreateThreadCommandHandler } from "./commands/handler/create-thread.handler"
import { IntelligenceRepository } from "./intelligence.repository"
import { EntityModule } from "@/shared/entity/entity.module"
import { FetchThreadByIdQueryHandler } from "./queries/handler/fetch-thread-by-id.handler"
import { IntelligenceOrchestrator } from "./intelligence.orchestrator"
import { AuthModule } from "@/auth/auth.module"

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    EntityModule.forFeature(
      [{ name: Thread.name, schema: ThreadSchema }],
      DbConnectionMap.Platform
    ),
  ],
  controllers: [IntelligenceController],
  providers: [
    IntelligenceService,
    IntelligenceRepository,
    IntelligenceOrchestrator,
    CreateThreadCommandHandler,
    FetchThreadByIdQueryHandler,
  ],
})
export class IntelligenceModule {}
