import { AppEventMap } from "@/shared/constants/app-events.map"
import { tool } from "langchain"
import { Injectable } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { Event } from "@/resources/event/schemas/event.schema"
import { CreateEventSchema, GetEventByMonthSchema } from "./event.schema"

@Injectable()
export class EventAgent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public getEventByMonthTool = tool(
    async ({ userId, eventMonth }: { userId: string; eventMonth: string }) => {
      try {
        const events: Event[] = await this.eventEmitter.emitAsync(
          AppEventMap.GetCalendarEvents,
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
        await this.eventEmitter.emitAsync(
          AppEventMap.CreateCalendarEvent,
          userId,
          {
            eventName,
            eventDate,
          }
        )
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
