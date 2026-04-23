import { Asset } from "../schemas/asset.schema"

export default function calculateSimpleValuation(asset: Asset): number {
  return asset.currentValuation
}
