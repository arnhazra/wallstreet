export interface CalendarEvent {
  _id: string
  userId: string
  eventName: string
  eventDate?: string | null | undefined
  createdAt: string
  eventSource: string
}
