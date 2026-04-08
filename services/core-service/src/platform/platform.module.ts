import { Module } from "@nestjs/common"
import { config } from "@/config"
import { GeneralDbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import { EntityModule } from "@/shared/entity/entity.module"
import { ConfigModule } from "./config/config.module"
import { CoworkModule } from "./cowork/cowork.module"
import { WidgetModule } from "./widget/widget.module"

@Module({
  imports: [
    EntityModule.forRoot(
      config.AZURE_COSMOS_DB_CONNECTION_STRING,
      GeneralDbConnectionMap.Platform
    ),
    ConfigModule,
    CoworkModule,
    WidgetModule,
  ],
})
export class PlatformModule {}
