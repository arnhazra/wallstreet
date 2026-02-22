import { EntityType } from "../components/entity-card/data"

export enum EventMap {
  Summarize = "summarize",
}

export interface EventPayloads {
  [EventMap.Summarize]: {
    entityType: EntityType
    entityDetails: string
    entityName: string
  }
}
