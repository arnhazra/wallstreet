import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import {
  CreateEventSchema,
  GetEventByMonthSchema,
} from "./schemas/eventagent.schema"
import { EventService } from "./event.service"

@Injectable()
export class EventAgent {
  constructor(private readonly service: EventService) {}

  public getEventByMonthTool = tool(
    async ({ userId, eventMonth }: { userId: string; eventMonth: string }) => {
      try {
        const events = await this.service.findMyEventsByMonth(
          userId,
          eventMonth
        )

        return JSON.stringify(events)
      } catch (error) {
        return "Unable to get the event list"
      }
    },
    {
      name: "get_events_by_month",
      description: "List down events for an user for any given month",
      schema: GetEventByMonthSchema,
    }
  )

  public createEventTool = tool(
    async ({
      userId,
      eventName,
      eventDate,
    }: {
      userId: string
      eventName: string
      eventDate: string
    }) => {
      try {
        await this.service.createEvent(userId, {
          eventName,
          eventDate,
        })
        return "Event created successfully"
      } catch (error) {
        return "Failed to create the event"
      }
    },
    {
      name: "create_event",
      description: "Create a new event for a user",
      schema: CreateEventSchema,
    }
  )
}
