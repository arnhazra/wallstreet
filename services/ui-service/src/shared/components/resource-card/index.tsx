import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import {
  Asset,
  Cashflow,
  Debt,
  Goal,
  AssetGroup,
} from "@/shared/constants/types"
import {
  Banknote,
  CreditCard,
  GoalIcon,
  Layers2,
  OctagonAlert,
  Plus,
  Workflow,
} from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/shared/lib/format-currency"
import { useUserContext } from "@/context/user.provider"
import Show from "../show"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import IconContainer from "../icon-container"
import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"
import { formatDate } from "@/shared/lib/date-formatter"
import { ResourceDetails } from "../resource-details"
import { ResourceTypeForDetailModal } from "../resource-details/data"
import { createResourceUrlMap, ResourceTypeMap, ResourceType } from "./data"
import { useRouter } from "nextjs-toploader/app"
import MaskText from "../mask"

const resourceIconMap = {
  [ResourceType.ASSET]: <Banknote className="h-4 w-4" />,
  [ResourceType.ASSETGROUP]: <Layers2 className="h-4 w-4" />,
  [ResourceType.DEBT]: <CreditCard className="h-4 w-4" />,
  [ResourceType.GOAL]: <GoalIcon className="h-4 w-4" />,
  [ResourceType.CASHFLOW]: <Workflow className="h-4 w-4" />,
}

type ResourceCardProps<T extends keyof ResourceTypeMap> = {
  resourceType: T
  resource: ResourceTypeMap[T]
}

export function ResourceCard<T extends keyof ResourceTypeMap>({
  resourceType,
  resource,
}: ResourceCardProps<T>) {
  const [{ user }] = useUserContext()
  const router = useRouter()
  const [enityTitle, setResourceTitle] = useState("")
  const [info, setInfo] = useState<{
    infoHeader: string
    infoValue: string
  }>({ infoHeader: "", infoValue: "" })

  const [valuation, setValuation] = useState<{
    valuationHeader: string
    valuationAmount: number | null | undefined | string
  }>({
    valuationHeader: "",
    valuationAmount: 0,
  })

  useEffect(() => {
    switch (resourceType) {
      case ResourceType.ASSETGROUP:
        setResourceTitle((resource as AssetGroup).assetgroupName)
        setInfo({
          infoHeader: "Assets",
          infoValue: (resource as AssetGroup).assetCount?.toString() || "0",
        })
        setValuation({
          valuationHeader: "Net Valuation",
          valuationAmount: (resource as AssetGroup).currentValuation,
        })
        const assetgroupCreatedAt = (resource as AssetGroup).createdAt
          ? formatDistanceToNow(
              new Date((resource as AssetGroup).createdAt ?? ""),
              {
                addSuffix: true,
              }
            )
          : null
        break
      case ResourceType.ASSET:
        setResourceTitle((resource as Asset).assetName)
        setInfo({
          infoHeader: "Identifier",
          infoValue: (resource as Asset).identifier,
        })
        setValuation({
          valuationHeader: "Current Valuation",
          valuationAmount: (resource as Asset).currentValuation,
        })
        const assetCreatedAt = (resource as Asset).createdAt
          ? formatDistanceToNow(new Date((resource as Asset).createdAt ?? ""), {
              addSuffix: true,
            })
          : null
        break
      case ResourceType.DEBT:
        setResourceTitle((resource as Debt).debtPurpose)
        setInfo({
          infoHeader: "Next EMI Date",
          infoValue: formatDate((resource as Debt).nextEmiDate),
        })
        setValuation({
          valuationHeader: "EMI",
          valuationAmount: (resource as Debt).emi,
        })
        const debtCreatedAt = (resource as Debt).createdAt
          ? formatDistanceToNow(new Date((resource as Debt).createdAt ?? ""), {
              addSuffix: true,
            })
          : null
        break
      case ResourceType.GOAL:
        setResourceTitle(formatDate((resource as Goal).goalDate, false))
        setInfo({
          infoHeader: "Goal Date",
          infoValue: formatDate((resource as Goal).goalDate, true),
        })
        setValuation({
          valuationHeader: "Goal",
          valuationAmount: (resource as Goal).goalAmount,
        })
        const goalCreatedAt = (resource as Goal).createdAt
          ? formatDistanceToNow(new Date((resource as Goal).createdAt ?? ""), {
              addSuffix: true,
            })
          : null
        break
      case ResourceType.CASHFLOW:
        setResourceTitle((resource as Cashflow).description)
        setInfo({
          infoHeader: "Flow Direction",
          infoValue: (resource as Cashflow).flowDirection,
        })
        setValuation({
          valuationHeader: "Cashflow Amount",
          valuationAmount: (resource as Cashflow).amount,
        })
        const cashflowCreatedAt = (resource as Cashflow).createdAt
          ? formatDistanceToNow(
              new Date((resource as Cashflow).createdAt ?? ""),
              {
                addSuffix: true,
              }
            )
          : null
        break
      default:
        break
    }
  }, [resourceType, resource])

  return (
    <ResourceDetails
      resourceType={resourceType as unknown as ResourceTypeForDetailModal}
      resource={resource as unknown as Asset | Debt | Goal | Cashflow}
    >
      <Card
        onClick={(): void => {
          if (resourceType === ResourceType.ASSETGROUP) {
            router.push(
              `/apps/assetmanager/assetgroup/${(resource as AssetGroup)._id}`
            )
          }
        }}
        className="bg-background/2 border h-[11rem] backdrop-blur-sm border-border p-2 rounded-3xl hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
      >
        <CardHeader className="flex mt-5 items-start gap-2">
          <div className="flex min-w-0 flex-1 gap-2">
            <h2 className=" text-xl truncate break-all">{enityTitle}</h2>
            <div className="mt-1 shrink-0">
              <Show
                condition={
                  (resourceType === ResourceType.ASSET &&
                    (resource as Asset).isMatured) ||
                  (resourceType === ResourceType.DEBT &&
                    (resource as Debt).isMatured)
                }
              >
                <Tooltip>
                  <TooltipTrigger>
                    <OctagonAlert className="h-4 w-4 text-secondary" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-background text-white border-border">
                    This {resourceType} is matured
                  </TooltipContent>
                </Tooltip>
              </Show>
              <Show
                condition={
                  (resourceType === ResourceType.ASSET &&
                    (resource as Asset).isMaturityApproaching) ||
                  (resourceType === ResourceType.DEBT &&
                    (resource as Debt).isMaturityApproaching)
                }
              >
                <Tooltip>
                  <TooltipTrigger>
                    <OctagonAlert className="h-4 w-4 text-amber-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-background text-white border-border">
                    This {resourceType} is about to mature
                  </TooltipContent>
                </Tooltip>
              </Show>
            </div>
          </div>
          <div className="shrink-0">
            <IconContainer>{resourceIconMap[resourceType]}</IconContainer>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-theme-200">{info.infoHeader}</span>
              <span className="text-sm font-medium">
                <Show
                  condition={resourceType === ResourceType.ASSET}
                  fallback={info.infoValue}
                >
                  <MaskText value={info.infoValue} />
                </Show>
              </span>
            </div>
            <Show condition={!!valuation.valuationHeader}>
              <div className="flex justify-between items-center">
                <span className="text-sm text-theme-200">
                  {valuation.valuationHeader}
                </span>
                {typeof valuation.valuationAmount === "string" ? (
                  <span className="text-lg font-bold text-white">
                    {valuation.valuationAmount}
                  </span>
                ) : (
                  <span className="text-lg font-bold text-white">
                    {formatCurrency(
                      Number(valuation.valuationAmount) ?? 0,
                      user.baseCurrency
                    )}
                  </span>
                )}
              </div>
            </Show>
          </div>
        </CardContent>
      </Card>
    </ResourceDetails>
  )
}

export function AddResourceCard({
  resourceType,
}: {
  resourceType: ResourceType
}) {
  return (
    <Link href={createResourceUrlMap[resourceType] ?? ""}>
      <Card className="bg-background/2 flex flex-row h-[11rem] items-center justify-center backdrop-blur-sm border border-border rounded-3xl relative overflow-hidden hover:shadow-md hover:shadow-primary/10">
        <IconContainer>
          <Plus className="w-4 h-4" />
        </IconContainer>
        <p className="text-lg font-medium capitalize">Add {resourceType}</p>
      </Card>
    </Link>
  )
}
