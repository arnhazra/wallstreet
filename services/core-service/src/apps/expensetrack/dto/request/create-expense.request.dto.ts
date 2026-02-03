import { ExpenseCategory } from "@/shared/constants/types"
import { IsNumber, IsEnum, IsNotEmpty, Matches } from "class-validator"

export class CreateExpenseRequestDto {
  title?: string

  @IsNumber()
  expenseAmount: number

  @IsNotEmpty()
  @IsEnum(ExpenseCategory)
  expenseCategory: ExpenseCategory

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  expenseDate: string
}
