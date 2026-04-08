import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Param,
  BadRequestException,
  Res,
} from "@nestjs/common"
import { Response } from "express"
import { TaxService } from "./tax.service"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { AuthGuard, ModRequest } from "@/auth/auth.guard"
import { statusMessages } from "@/shared/constants/status-messages"

@Controller("resource/tax")
export class TaxController {
  constructor(private readonly service: TaxService) {}

  @UseGuards(AuthGuard)
  @Post()
  async generateRecommendation(
    @Request() request: ModRequest,
    @Body() aiGenerationDto: AIGenerationDto,
    @Res() res: Response
  ) {
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    res.flushHeaders()

    try {
      for await (const event of this.service.generateRecommendationStream(
        aiGenerationDto,
        request.user.userId
      )) {
        res.write(`data: ${JSON.stringify(event)}\n\n`)
      }

      res.write("data: [DONE]\n\n")
      res.end()
    } catch (error) {
      res.write(
        `data: ${JSON.stringify({ type: "error", data: error.message || statusMessages.connectionError })}\n\n`
      )
      res.end()
    }
  }

  @UseGuards(AuthGuard)
  @Get("getthreads")
  async getThreadsByUserId(@Request() request: ModRequest) {
    try {
      return await this.service.getThreadsByUserId(request.user.userId)
    } catch (error) {
      throw new BadRequestException(
        error.message || statusMessages.connectionError
      )
    }
  }

  @UseGuards(AuthGuard)
  @Get(":threadId")
  async getThreadById(
    @Request() request: ModRequest,
    @Param("threadId") threadId: string
  ) {
    try {
      return await this.service.getThreadById(threadId, false)
    } catch (error) {
      throw new BadRequestException(
        error.message || statusMessages.connectionError
      )
    }
  }
}
