import { Injectable } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateThreadCommand } from "./commands/impl/create-thread.command"
import { Thread } from "./schemas/thread.schema"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { AppEventMap } from "@/shared/constants/app-events.map"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { FetchThreadByIdQuery } from "./queries/impl/fetch-thread-by-id.query"
import { FetchThreadsByUserIdQuery } from "./queries/impl/fetch-threads-by-user-id.query"
import {
  TaxAdvisorStrategy,
  TaxAdvisorStrategyType,
} from "./taxadvisor.strategy"
import { User } from "@/auth/schemas/user.schema"
import { createOrConvertObjectId } from "@/shared/entity/entity.schema"

@Injectable()
export class TaxAdvisorService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly strategy: TaxAdvisorStrategy,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async getThreadsByUserId(userId: string) {
    try {
      return await this.queryBus.execute<FetchThreadsByUserIdQuery, Thread[]>(
        new FetchThreadsByUserIdQuery(userId)
      )
    } catch (error) {
      throw error
    }
  }

  async getThreadById(threadId: string, isFirstMessage: boolean) {
    try {
      if (isFirstMessage) {
        return []
      }

      const thread = await this.queryBus.execute<
        FetchThreadByIdQuery,
        Thread[]
      >(new FetchThreadByIdQuery(threadId))
      if (!!thread && thread.length) {
        return thread
      } else {
        throw new Error("Thread not found")
      }
    } catch (error) {
      throw error
    }
  }

  async *generateRecommendationStream(
    aiGenerationDto: AIGenerationDto,
    userId: string
  ): AsyncGenerator<{ type: string; data: string }> {
    const { prompt } = aiGenerationDto
    const threadId =
      aiGenerationDto.threadId ?? createOrConvertObjectId().toString()
    const thread = await this.getThreadById(threadId, !aiGenerationDto.threadId)

    const user: User = (
      await this.eventEmitter.emitAsync(AppEventMap.GetUserDetails, userId)
    ).shift()

    const args: TaxAdvisorStrategyType = {
      temperature: 0.8,
      topP: 0.8,
      thread,
      prompt,
      threadId,
      user,
    }

    yield { type: "threadId", data: threadId }

    let fullResponse = ""

    for await (const token of this.strategy.adviseStream(args)) {
      fullResponse += token
      yield { type: "token", data: token }
    }

    await this.commandBus.execute<CreateThreadCommand, Thread>(
      new CreateThreadCommand(String(user._id), threadId, prompt, fullResponse)
    )
  }
}
