import { ForbiddenException } from "@nestjs/common"
import { statusMessages } from "../constants/status-messages"
import { ObjectId } from "../entity/entity.schema"

interface Ownable {
  userId: ObjectId
}

export function assertOwnership(resource: Ownable, reqUserId: string) {
  if (String(resource.userId) !== reqUserId) {
    throw new ForbiddenException(statusMessages.forbidden)
  }
}
