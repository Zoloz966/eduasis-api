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
  import { TeachersService } from './services/teachers.service';
  import { CreateTeacherDto } from './dto/create-teacher.dto';
  import { UpdateTeacherDto } from './dto/update-teacher.dto';
  
  import { ApiTags } from '@nestjs/swagger';
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  import { Public } from 'src/auth/decorators/public.decorator';
  
  @UseGuards(JwtAuthGuard)
  @ApiTags('academicManagement')
  @Controller('teachers')
  export class TeachersController {
    constructor(private readonly teachersService: TeachersService) {}
  
    @Post()
    create(@Body() createTeacherDto: CreateTeacherDto) {
      return this.teachersService.create(createTeacherDto);
    }
  
    @Get()
    findAll() {
      return this.teachersService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.teachersService.findOne(+id);
    }
  
    @Get('login/:email/:password')
    login(@Param('email') email: string, @Param('password') password: string) {
      return this.teachersService.login(email, password);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
      return this.teachersService.update(+id, updateTeacherDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      await this.teachersService.remove(+id);
      return { message: `Teacher with id: ${id} deleted successfully` };
    }
  }
  