import { EventMap, EventPayloads } from "./events-map"

export class TypedEventEmitter {
  private listeners: {
    [K in EventMap]?: Array<(payload: EventPayloads[K]) => void>
  } = {}

  on<K extends EventMap>(
    event: K,
    listener: (payload: EventPayloads[K]) => void
  ) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push(listener)
  }

  off<K extends EventMap>(
    event: K,
    listener: (payload: EventPayloads[K]) => void
  ) {
    if (!this.listeners[event]) return
    this.listeners[event]!.splice(this.listeners[event]!.indexOf(listener), 1)
  }

  emit<K extends EventMap>(event: K, payload: EventPayloads[K]) {
    this.listeners[event]?.forEach((listener) => listener(payload))
  }
}

export const eventEmitter = new TypedEventEmitter()
