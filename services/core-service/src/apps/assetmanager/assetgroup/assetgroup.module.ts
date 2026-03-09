import { Module } from "@nestjs/common"
import { AssetGroupService } from "./assetgroup.service"
import { AssetGroupController } from "./assetgroup.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { AssetGroup, AssetGroupSchema } from "./schemas/assetgroup.schema"
import { AppsDbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import { AssetGroupRepository } from "./assetgroup.repository"
import { CreateAssetGroupCommandHandler } from "./commands/handler/create-assetgroup.handler"
import { DeleteAssetGroupCommandHandler } from "./commands/handler/delete-assetgroup.handler"
import { FindAllAssetGroupQueryHandler } from "./queries/handler/find-all-assetgroups.handler"
import { FindAssetGroupByIdQueryHandler } from "./queries/handler/find-assetgroup-by-id.handler"
import { EntityModule } from "@/shared/entity/entity.module"
import { UpdateAssetGroupCommandHandler } from "./commands/handler/update-assetgroup.handler"
import { AssetModule } from "../asset/asset.module"

@Module({
  imports: [
    CqrsModule,
    AssetModule,
    EntityModule.forFeature(
      [{ name: AssetGroup.name, schema: AssetGroupSchema }],
      AppsDbConnectionMap.AssetManager
    ),
  ],
  controllers: [AssetGroupController],
  providers: [
    AssetGroupService,
    AssetGroupRepository,
    CreateAssetGroupCommandHandler,
    UpdateAssetGroupCommandHandler,
    DeleteAssetGroupCommandHandler,
    FindAllAssetGroupQueryHandler,
    FindAssetGroupByIdQueryHandler,
  ],
})
export class AssetGroupModule {}
