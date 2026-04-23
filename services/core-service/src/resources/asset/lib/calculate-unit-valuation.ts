import { Asset } from "../schemas/asset.schema"

export default function calculateUnitValuation(asset: Asset): number {
  const { units, unitPurchasePrice } = asset
  return units * unitPurchasePrice
}
