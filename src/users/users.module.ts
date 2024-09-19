import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './entities/user.entity';
import { UserLogs } from './entities/userLog.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

import { Role } from './entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './services/role.service';

import { Access } from './entities/access.entity';
import { AccessController } from './access.controller';
import { AccessService } from './services/access.service';
import { CitiesService } from 'src/admin/services/cities.service';
import { Cities } from 'src/admin/entities/city.entity';
import { UserContextModule } from 'src/userContext/userContext.module';
import { Branches } from 'src/admin/entities/branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserLogs, Branches, Role, Access, Cities]),
    UserContextModule,
  ],
  controllers: [UsersController, RoleController, AccessController],
  providers: [UsersService, RoleService, AccessService, CitiesService],
  exports: [UsersService],
})
export class UsersModule {}
