import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { CoworkRepository } from "../../cowork.repository"
import { FetchThreadByIdQuery } from "../impl/fetch-thread-by-id.query"
import { createOrConvertObjectId } from "@/shared/entity/entity.schema"

@QueryHandler(FetchThreadByIdQuery)
export class FetchThreadByIdQueryHandler implements IQueryHandler<FetchThreadByIdQuery> {
  constructor(private readonly repository: CoworkRepository) {}

  async execute(query: FetchThreadByIdQuery) {
    const { threadId } = query
    return await this.repository.find({
      threadId: createOrConvertObjectId(threadId),
    })
  }
}
