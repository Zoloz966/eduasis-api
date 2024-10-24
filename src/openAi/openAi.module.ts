import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OpenAIService } from './services/openAi.service';
import { OpenAiController } from './openAi.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([  ]),
  ],
  controllers: [OpenAiController],
  providers: [OpenAIService],
  exports: [],
})
export class OpenAiModule {}
