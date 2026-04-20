import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import { CreateGoalSchema, GetByUserIdSchema } from "./schemas/goalagent.schema"
import { GoalService } from "./goal.service"

@Injectable()
export class GoalAgent {
  constructor(private readonly service: GoalService) {}

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
        await this.service.createGoal(userId, {
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
        const goals = await this.service.findMyGoals(userId)
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
        const goal = await this.service.findNearestGoal(userId)
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
