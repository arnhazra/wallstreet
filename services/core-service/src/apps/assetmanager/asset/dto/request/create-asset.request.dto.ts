import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  Matches,
} from "class-validator"
import { AssetType, RecurringFrequency } from "@/shared/constants/types"

export class CreateAssetRequestDto {
  @IsNotEmpty()
  assetgroupId: string

  @IsNotEmpty()
  @IsEnum(AssetType)
  assetType: AssetType

  @IsNotEmpty()
  @IsString()
  assetName: string

  @IsNotEmpty()
  @IsString()
  identifier: string

  @ValidateIf((o) =>
    [
      AssetType.LUMPSUM_DEPOSIT,
      AssetType.RECURRING_DEPOSIT,
      AssetType.BOND,
    ].includes(o.assetType)
  )
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  startDate?: string

  @ValidateIf((o) =>
    [
      AssetType.LUMPSUM_DEPOSIT,
      AssetType.RECURRING_DEPOSIT,
      AssetType.BOND,
    ].includes(o.assetType)
  )
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  maturityDate?: string

  @ValidateIf((o) =>
    [AssetType.LUMPSUM_DEPOSIT, AssetType.BOND].includes(o.assetType)
  )
  @IsNumber()
  amountInvested?: number

  @ValidateIf((o) =>
    [
      AssetType.LUMPSUM_DEPOSIT,
      AssetType.RECURRING_DEPOSIT,
      AssetType.BOND,
    ].includes(o.assetType)
  )
  @IsNumber()
  expectedReturnRate?: number

  @ValidateIf((o) => [AssetType.RECURRING_DEPOSIT].includes(o.assetType))
  @IsNumber()
  contributionAmount?: number

  @ValidateIf((o) => [AssetType.RECURRING_DEPOSIT].includes(o.assetType))
  @IsEnum(RecurringFrequency)
  contributionFrequency?: RecurringFrequency

  @ValidateIf((o) =>
    [AssetType.REAL_ESTATE, AssetType.METAL, AssetType.OTHER].includes(
      o.assetType
    )
  )
  @IsNumber()
  valuationOnPurchase?: number

  @ValidateIf((o) =>
    [
      AssetType.LIQUID,
      AssetType.RETIREMENT,
      AssetType.REAL_ESTATE,
      AssetType.METAL,
      AssetType.OTHER,
    ].includes(o.assetType)
  )
  @IsNumber()
  currentValuation?: number

  @ValidateIf((o) => [AssetType.EQUITY, AssetType.CRYPTO].includes(o.assetType))
  @IsNumber()
  units?: number

  @ValidateIf((o) => [AssetType.EQUITY, AssetType.CRYPTO].includes(o.assetType))
  @IsNumber()
  unitPurchasePrice?: number
}
