"use client"
import { ReactNode, createContext, useContext } from "react"
import { PlatformConfig } from "@/shared/constants/types"
import { endPoints } from "@/shared/constants/api-endpoints"
import useQuery from "@/shared/hooks/use-query"
import HTTPMethods from "@/shared/constants/http-methods"
import LoaderIcon from "@/shared/components/loader-icon"
import Loading from "@/app/loading"

type PlatformConfigContextType = {
  platformConfig: PlatformConfig | undefined
}

const PlatformConfigContext = createContext<PlatformConfigContextType>({
  platformConfig: undefined,
})

export function PlatformConfigProvider({ children }: { children: ReactNode }) {
  const { data: platformConfig, isLoading } = useQuery<PlatformConfig>({
    queryKey: ["platform-config"],
    queryUrl: `${endPoints.getConfig}/platform-config`,
    method: HTTPMethods.GET,
    suspense: false,
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <PlatformConfigContext.Provider value={{ platformConfig }}>
      {children}
    </PlatformConfigContext.Provider>
  )
}

export function usePlatformConfig() {
  const context = useContext(PlatformConfigContext)

  if (!context) {
    throw new Error(
      "usePlatformConfig must be used within a PlatformConfigProvider"
    )
  }

  return context
}
