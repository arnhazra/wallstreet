import { IsNotEmpty } from "class-validator"

export class SubscriptionRequestDto {
  @IsNotEmpty()
  subscriptionTier: string
}
