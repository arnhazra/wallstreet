import { Button } from "../../ui/button"
import { Sparkles } from "lucide-react"
import Show from "../../show"
import { EntityType } from "../../entity-card/data"
import { useUserContext } from "@/context/user.provider"
import { eventEmitter } from "@/shared/event-emitter/event-emitter"
import { EventMap } from "@/shared/event-emitter/events-map"

interface SummarizerProps {
  entityType: EntityType
  entityDetails: string
  entityName: string
}

export default function EntitySummarizer({
  entityType,
  entityDetails,
  entityName,
}: SummarizerProps) {
  const [{ user }] = useUserContext()

  const summarize = () => {
    eventEmitter.emit(EventMap.Summarize, {
      entityDetails,
      entityName,
      entityType,
    })
  }

  return (
    <Show condition={user.useIntelligence}>
      <Button
        className="text-white font-semibold ui-soft-gradient hover:opacity-90 transition"
        variant="default"
        size="icon"
        title="Summarize"
        onClick={summarize}
      >
        <Sparkles className="h-4 w-4" />
      </Button>
    </Show>
  )
}
