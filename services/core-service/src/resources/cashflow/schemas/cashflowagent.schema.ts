import { z } from "zod"

export const GetByUserIdSchema = z.object({
  userId: z.string().describe("user id of the user"),
})
