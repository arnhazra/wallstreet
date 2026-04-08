"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { Thread } from "@/shared/constants/types"
import { AddEntityCard, EntityCard } from "@/shared/components/entity-card"
import { EntityType } from "@/shared/components/entity-card/data"

export default function Page() {
  const threads = useQuery<Thread[]>({
    queryKey: ["get-taxadvisor-threads"],
    queryUrl: `${endPoints.tax}/getthreads`,
    method: HTTPMethods.GET,
  })

  const renderThreads = threads?.data?.map((thread) => (
    <EntityCard
      entityType={EntityType.THREAD}
      entity={thread}
      key={thread._id}
    />
  ))

  return (
    <section>
      <div className="mx-auto grid gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
        <AddEntityCard entityType={EntityType.THREAD} />
        {renderThreads}
      </div>
    </section>
  )
}
