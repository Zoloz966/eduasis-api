import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserContextModule } from 'src/userContext/userContext.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([  ]),
    UserContextModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminModule {}
