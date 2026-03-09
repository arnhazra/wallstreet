import {
  Controller,
  Post,
  BadRequestException,
  Get,
  Delete,
  UseGuards,
  Request,
  Param,
  Body,
  Put,
  Query,
} from "@nestjs/common"
import { AssetGroupService } from "./assetgroup.service"
import { statusMessages } from "@/shared/constants/status-messages"
import { AuthGuard, ModRequest } from "@/auth/auth.guard"
import { CreateAssetGroupRequestDto } from "./dto/request/create-assetgroup.request.dto"

@Controller("apps/assetmanager/assetgroup")
export class AssetGroupController {
  constructor(private readonly service: AssetGroupService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createAssetGroup(
    @Body() requestBody: CreateAssetGroupRequestDto,
    @Request() request: ModRequest
  ) {
    try {
      return await this.service.createAssetGroup(
        request.user.userId,
        requestBody
      )
    } catch (error) {
      throw new BadRequestException(
        error.message || statusMessages.connectionError
      )
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findMyAssetGroups(
    @Request() request: ModRequest,
    @Query("searchKeyword") searchKeyword?: string
  ) {
    try {
      return await this.service.findMyAssetGroups(
        request.user.userId,
        searchKeyword
      )
    } catch (error) {
      throw new BadRequestException(
        error.message || statusMessages.connectionError
      )
    }
  }

  @UseGuards(AuthGuard)
  @Get("/:assetgroupId")
  async findAssetGroupById(
    @Request() request: ModRequest,
    @Param("assetgroupId") assetgroupId: string
  ) {
    try {
      const assetgroup = await this.service.findAssetGroupById(
        request.user.userId,
        assetgroupId
      )
      if (!assetgroup) throw new Error()
      return assetgroup
    } catch (error) {
      throw new BadRequestException(
        error.message || statusMessages.connectionError
      )
    }
  }

  @UseGuards(AuthGuard)
  @Put(":assetgroupId")
  async updateAssetGroupById(
    @Body() requestBody: CreateAssetGroupRequestDto,
    @Param("assetgroupId") assetgroupId: string,
    @Request() request: ModRequest
  ) {
    try {
      return await this.service.updateAssetGroupById(
        request.user.userId,
        assetgroupId,
        requestBody
      )
    } catch (error) {
      throw new BadRequestException(
        error.message || statusMessages.connectionError
      )
    }
  }

  @UseGuards(AuthGuard)
  @Delete("/:assetgroupId")
  async deleteAssetGroup(
    @Request() request: ModRequest,
    @Param("assetgroupId") assetgroupId: string
  ) {
    try {
      return await this.service.deleteAssetGroup(
        request.user.userId,
        assetgroupId
      )
    } catch (error) {
      throw new BadRequestException(
        error.message || statusMessages.connectionError
      )
    }
  }
}
