import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { TaxAdvisorRepository } from "../../taxadvisor.repository"
import { FetchThreadsByUserIdQuery } from "../impl/fetch-threads-by-user-id.query"
import { createOrConvertObjectId } from "@/shared/entity/entity.schema"
import { Thread } from "../../schemas/thread.schema"

@QueryHandler(FetchThreadsByUserIdQuery)
export class FetchThreadsByUserIdQueryHandler implements IQueryHandler<FetchThreadsByUserIdQuery> {
  constructor(private readonly repository: TaxAdvisorRepository) {}

  async execute(query: FetchThreadsByUserIdQuery): Promise<Thread[]> {
    const { userId } = query
    return await this.repository.aggregate<Thread>([
      { $match: { userId: createOrConvertObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$threadId", doc: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$doc" } },
      { $sort: { createdAt: -1 } },
    ])
  }
}
