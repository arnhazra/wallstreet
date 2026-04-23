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
import { DebtService } from "./debt.service"
import { statusMessages } from "@/shared/constants/status-messages"
import { AuthGuard, ModRequest } from "@/auth/auth.guard"
import { CreateDebtRequestDto } from "./dto/request/create-debt.request.dto"

@Controller("resource/debt")
export class DebtController {
  constructor(private readonly service: DebtService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createDebt(
    @Body() dto: CreateDebtRequestDto,
    @Request() request: ModRequest
  ) {
    try {
      const { userId } = request.user
      return await this.service.createDebt({ userId, ...dto })
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findMyDebts(
    @Request() request: ModRequest,
    @Query("searchKeyword") searchKeyword?: string
  ) {
    try {
      const { userId } = request.user
      return await this.service.findMyDebts({ userId, searchKeyword })
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(AuthGuard)
  @Get("/:debtId")
  async findDebtById(
    @Request() request: ModRequest,
    @Param("debtId") debtId: string
  ) {
    try {
      return await this.service.findDebtById(request.user.userId, debtId)
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(AuthGuard)
  @Put(":debtId")
  async updateDebtById(
    @Body() requestBody: CreateDebtRequestDto,
    @Param("debtId") debtId: string,
    @Request() request: ModRequest
  ) {
    try {
      return await this.service.updateDebtById(
        request.user.userId,
        debtId,
        requestBody
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(AuthGuard)
  @Delete("/:debtId")
  async deleteDebt(
    @Request() request: ModRequest,
    @Param("debtId") debtId: string
  ) {
    try {
      return await this.service.deleteDebt(request.user.userId, debtId)
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
