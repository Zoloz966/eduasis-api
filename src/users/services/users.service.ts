import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, FilterUsersLogDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Users } from '../entities/user.entity';
import { RoleService } from './role.service';
import { In, Repository } from 'typeorm';
import { UserLogs } from '../entities/userLog.entity';
import { CreateUserLogsDto } from '../dto/create-userLog.dto';
import { UserContextService } from 'src/userContext/service/userContext.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userCount = await this.userRepository.count();
    const newUser = this.userRepository.create(createUserDto);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (createUserDto.roleIdRole) {
      const role = await this.roleService.findOne(createUserDto.roleIdRole);
      newUser.role = role;
    }

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async findAll() {
    const list = await this.userRepository.find({
      relations: ['role'],
      where: { status: 1 },
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    return list;
  }

  async findOne(id: number) {
    const item = await this.userRepository.findOne({
      relations: ['role'],
      where: { id_user: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This user #${id} not found`);
    }
    return item;
  }

  async findOneUser(id: number) {
    const item = await this.userRepository.findOne({
      where: { id_user: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This user #${id} not found`);
    }
    return item;
  }

  async login(email: string, password: string) {
    const item = await this.userRepository.findOne({
      relations: ['role'],
      where: { email: email, password: password },
    });
    if (!item) {
      throw new NotFoundException(
        `El usuario con el correo ${email} no se ha encontrado`,
      );
    }

    if (item.role) {
      const access = await this.roleService.findOne(item.role.id_role);
      item.role = access;
    }

    return item;
  }

  async findbyemail(email: string) {
    const item = await this.userRepository.findOne({
      relations: ['role'],
      where: { email: email, status: 1 },
    });

    if (item) {
      if (item.role) {
        const access = await this.roleService.findOne(item.role.id_role);
        item.role = access;
      }
      return item;
    } else {
      throw new NotFoundException(`El usuario ${email} no se ha encontrado`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const item = await this.userRepository.findOne({
      where: { id_user: id, status: 1 },
      relations: ['role'],
    });

    if (updateUserDto.password) {
      const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashPassword;
    }

    if (updateUserDto.roleIdRole) {
      const role = await this.roleService.findOne(updateUserDto.roleIdRole);
      item.role = role;
    }

    this.userRepository.merge(item, updateUserDto);

    const savedUser = await this.userRepository.save(item);

    return savedUser;
  }

  async remove(id: number) {
    const item = await this.userRepository.findOneBy({ id_user: id });
    const deleteUser: UpdateUserDto = {
      status: 0,
    };

    this.userRepository.merge(item, deleteUser);

    const savedUser = await this.userRepository.save(item);

    return savedUser;
  }
}
