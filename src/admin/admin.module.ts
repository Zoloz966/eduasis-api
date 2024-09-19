import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserContextModule } from 'src/userContext/userContext.module';
import { UserLogs } from 'src/users/entities/userLog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserLogs, ]),
    UserContextModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminModule {}
