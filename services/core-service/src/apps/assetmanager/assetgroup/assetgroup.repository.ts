import { Injectable } from "@nestjs/common"
import { AssetGroup } from "./schemas/assetgroup.schema"
import { AppsDbConnectionMap } from "@/shared/entity/entity-db-connection.map"
import {
  EntityModel,
  EntityRepository,
  InjectEntityModel,
} from "@/shared/entity/entity.repository"

@Injectable()
export class AssetGroupRepository extends EntityRepository<AssetGroup> {
  constructor(
    @InjectEntityModel(AssetGroup.name, AppsDbConnectionMap.AssetManager)
    private assetgroupModel: EntityModel<AssetGroup>
  ) {
    super(assetgroupModel)
  }
}
