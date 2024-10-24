import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OpenAIService } from './services/openAi.service';

@UseGuards(JwtAuthGuard)
@ApiTags('openAi')
@Controller('openAi')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAIService) {}

  @Get('test/:content')
  login(@Param('content') content: string) {
    return this.openAiService.getBasicPrompt(content);
  }
}
