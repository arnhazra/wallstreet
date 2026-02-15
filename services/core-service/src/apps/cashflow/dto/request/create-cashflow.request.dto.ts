import { IsNumber, IsNotEmpty, IsEnum, Matches } from "class-validator"
import { FlowDirection, FlowFrequency } from "../../schemas/cashflow.schema"

export class CreateCashFlowRequestDto {
  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  targetAsset: string

  @IsEnum(FlowDirection)
  flowDirection: FlowDirection

  @IsNumber()
  amount: number

  @IsEnum(FlowFrequency)
  frequency: FlowFrequency

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  nextExecutionAt?: string
}
