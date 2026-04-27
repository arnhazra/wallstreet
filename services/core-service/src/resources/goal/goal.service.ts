import { Injectable } from "@nestjs/common"
import { statusMessages } from "@/shared/constants/status-messages"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { Goal } from "./schemas/goal.schema"
import { DeleteGoalCommand } from "./commands/impl/delete-goal.command"
import { CreateGoalCommand } from "./commands/impl/create-goal.command"
import { CreateGoalRequestDto } from "./dto/request/create-goal.request.dto"
import { UpdateGoalCommand } from "./commands/impl/update-goal.command"
import { FindGoalsByUserQuery } from "./queries/impl/find-goal-by-user.query"
import { FindGoalByIdQuery } from "./queries/impl/find-goal-by-id.query"
import { FindNearestGoalQuery } from "./queries/impl/find-nearest-goal.query"
import { z } from "zod"
import { AgentTool } from "@/intelligence/agent/agent.decorator"
import { CreateGoalInputSchema } from "./schemas/goalagent.schema"
import { BaseAgentSchema } from "@/intelligence/agent/agent.schema"

@Injectable()
export class GoalService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @AgentTool({
    name: "create_goal",
    description: "Create a new goal for a user",
    schema: CreateGoalInputSchema,
  })
  async createGoal(dto: z.output<typeof CreateGoalInputSchema>) {
    try {
      const { userId, ...rest } = dto
      return await this.commandBus.execute<CreateGoalCommand, Goal>(
        new CreateGoalCommand(userId, { ...rest })
      )
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }

  @AgentTool({
    name: "get_goal_list",
    description: "List down all goals for user",
    schema: BaseAgentSchema,
  })
  async findMyGoals(dto: z.output<typeof BaseAgentSchema>) {
    try {
      const { userId } = dto
      return await this.queryBus.execute<FindGoalsByUserQuery, Goal[]>(
        new FindGoalsByUserQuery(userId)
      )
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }

  @AgentTool({
    name: "get_user_nearest_goal",
    description: "Get nearest goal of a user",
    schema: BaseAgentSchema,
  })
  async findNearestGoal(dto: z.output<typeof BaseAgentSchema>) {
    try {
      const { userId } = dto
      const goal = await this.queryBus.execute<FindNearestGoalQuery, Goal>(
        new FindNearestGoalQuery(userId)
      )
      return goal ?? null
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }

  async findGoalById(reqUserId: string, goalId: string) {
    try {
      return await this.queryBus.execute<FindGoalByIdQuery, Goal>(
        new FindGoalByIdQuery(reqUserId, goalId)
      )
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }

  async updateGoalById(
    userId: string,
    goalId: string,
    requestBody: CreateGoalRequestDto
  ) {
    try {
      return await this.commandBus.execute<UpdateGoalCommand, Goal>(
        new UpdateGoalCommand(userId, goalId, requestBody)
      )
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }

  async deleteGoal(reqUserId: string, goalId: string) {
    try {
      const { userId } = await this.queryBus.execute<FindGoalByIdQuery, Goal>(
        new FindGoalByIdQuery(reqUserId, goalId)
      )
      if (userId.toString() === reqUserId) {
        await this.commandBus.execute(new DeleteGoalCommand(goalId))
        return { success: true }
      }

      throw new Error(statusMessages.connectionError)
    } catch (error) {
      throw new Error(statusMessages.connectionError)
    }
  }
}
