"use client"
import { AppCard } from "@/shared/components/app-card"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import { AppsConfig } from "@/shared/constants/types"
import { useUserContext } from "@/context/user.provider"
import { Widget } from "@/shared/constants/types"
import WidgetCard from "@/shared/components/widget-card"

export default function Page() {
  const [{ searchKeyword, user }] = useUserContext()
  const userFirstName = user.name?.split(" ")[0]

  const { data } = useQuery<AppsConfig>({
    queryKey: ["app-config"],
    queryUrl: `${endPoints.getConfig}/app-config`,
    method: HTTPMethods.GET,
  })

  const { data: widgetData } = useQuery<Widget[]>({
    queryKey: ["get-widgets"],
    queryUrl: endPoints.widgets,
    method: HTTPMethods.GET,
  })

  const renderApps = () => {
    if (!data?.apps) return null

    const searchPattern = new RegExp(searchKeyword, "i")
    return data.apps
      .filter(
        (app) =>
          searchPattern.test(app.displayName) ||
          searchPattern.test(app.appName) ||
          searchPattern.test(app.description)
      )
      .map((app) => <AppCard key={app.appName} app={app} />)
  }

  const widgets = widgetData?.map((widget) => {
    return <WidgetCard key={widget.title} widget={widget} />
  })

  return (
    <div className="mx-auto grid w-full items-start gap-6">
      <section>
        <h1 className="text-2xl -mb-2 -mt-2 ms-1">Hey, {userFirstName}</h1>
      </section>
      <section>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {widgets}
          </div>
        </div>
      </section>
      <section>
        <p className="text-xl mb-4 -mt-2 ms-1">Apps</p>
        <div className="mx-auto grid justify-center gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
          {renderApps()}
        </div>
      </section>
    </div>
  )
}
