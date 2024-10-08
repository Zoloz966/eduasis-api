import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserContextModule } from 'src/userContext/userContext.module';
import { UserLogs } from 'src/users/entities/userLog.entity';
import { OpenAIService } from './services/openAi.service';
import { OpenAiController } from './openAi.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserLogs, ]),
    UserContextModule,
  ],
  controllers: [OpenAiController],
  providers: [OpenAIService],
  exports: [],
})
export class OpenAiModule {}
