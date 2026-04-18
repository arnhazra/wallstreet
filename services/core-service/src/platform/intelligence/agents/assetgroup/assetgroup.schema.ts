import { z } from "zod"

export const GetByUserIdSchema = z.object({
  userId: z.string().describe("user id of the user"),
})

export const CreateAssetGroupSchema = z.object({
  userId: z.string().describe("user id of the user"),
  assetgroupName: z.string().describe("assetgroup name given by the user"),
})

export const GetAssetGroupListSchema = z.object({
  userId: z.string().describe("user id of the user"),
  searchKeyword: z
    .string()
    .describe("assetgroup name given by the user to search - this is optional"),
})

export const GetAssetGroupValuationSchema = z.object({
  userId: z.string().describe("user id of the user"),
  assetgroupName: z.string().describe("assetgroup name given by the user"),
})
