"use client"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { AssetGroup } from "@/shared/constants/types"
import { AddEntityCard, EntityCard } from "@/shared/components/entity-card"
import { EntityType } from "@/shared/components/entity-card/data"
import { useUserContext } from "@/context/user.provider"
import { buildQueryUrl } from "@/shared/lib/build-url"

export default function Page() {
  const [{ searchKeyword }] = useUserContext()
  const assetgroups = useQuery<AssetGroup[]>({
    queryKey: ["get-assetgroups", searchKeyword],
    queryUrl: buildQueryUrl(endPoints.assetgroup, {
      searchKeyword: encodeURIComponent(searchKeyword),
    }),
    method: HTTPMethods.GET,
    suspense: !!searchKeyword ? false : true,
  })

  const renderAssetGroups = assetgroups?.data?.map((assetgroup) => (
    <EntityCard
      entityType={EntityType.ASSETGROUP}
      entity={assetgroup}
      key={assetgroup._id}
    />
  ))

  return (
    <section>
      <div className="mx-auto grid gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
        <AddEntityCard entityType={EntityType.ASSETGROUP} />
        {renderAssetGroups}
      </div>
    </section>
  )
}
