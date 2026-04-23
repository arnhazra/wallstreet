import { Module } from "@nestjs/common"
import { PlatformModule } from "./platform/platform.module"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { MainController } from "./main.controller"
import { AuthModule } from "./auth/auth.module"
import { ResourceModule } from "./resources/resources.module"
import { SharedModule } from "./shared/shared.module"
import { IntelligenceModule } from "./intelligence/intelligence.module"

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    AuthModule,
    IntelligenceModule,
    PlatformModule,
    ResourceModule,
    SharedModule,
  ],
  controllers: [MainController],
  providers: [],
})
export class MainModule {}
