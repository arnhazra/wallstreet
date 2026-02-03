import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator"

export class CreateDebtRequestDto {
  @IsNotEmpty()
  @IsString()
  debtPurpose: string

  @IsNotEmpty()
  @IsString()
  identifier: string

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  startDate: string

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  endDate: string

  @IsNumber()
  principalAmount: number

  @IsNumber()
  interestRate: number
}
