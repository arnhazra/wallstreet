import { AppEventMap } from "@/shared/constants/app-events.map"
import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { Goal } from "@/resources/goal/schemas/goal.schema"
import { CreateGoalSchema, GetByUserIdSchema } from "./goal.schema"

@Injectable()
export class GoalAgent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public createGoalTool = tool(
    async ({
      userId,
      goalDate,
      goalAmount,
    }: {
      userId: string
      goalDate: string
      goalAmount: number
    }) => {
      try {
        await this.eventEmitter.emitAsync(AppEventMap.CreateGoal, userId, {
          goalDate,
          goalAmount,
        })
        return "Goal created successfully"
      } catch (error) {
        return "Failed to create the goal"
      }
    },
    {
      name: "create_goal",
      description: "Create a new goal for a user",
      schema: CreateGoalSchema,
    }
  )

  public getGoalListTool = tool(
    async ({ userId }: { userId: string }) => {
      try {
        const goals: Goal[] = await this.eventEmitter.emitAsync(
          AppEventMap.GetGoalList,
          userId
        )

        return JSON.stringify(goals)
      } catch (error) {
        return "Unable to get the goal list"
      }
    },
    {
      name: "get_goal_list",
      description: "List down all goals for user",
      schema: GetByUserIdSchema,
    }
  )

  public getNearestGoalTool = tool(
    async ({ userId }: { userId: string }) => {
      try {
        const goal: Goal = (
          await this.eventEmitter.emitAsync(AppEventMap.GetNearestGoal, userId)
        ).shift()

        return JSON.stringify(goal)
      } catch (error) {
        return "Unable to get the goal list"
      }
    },
    {
      name: "get_user_nearest_goal",
      description: "Get nearest goal of a user",
      schema: GetByUserIdSchema,
    }
  )
}
