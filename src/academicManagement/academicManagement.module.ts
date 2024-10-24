import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './entities/students.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './services/students.service';
import { Teachers } from './entities/teachers.entity';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './services/teachers.service';
import { Subjects } from './entities/subjects.entity';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './services/subjects.service';
import { Classes } from './entities/classes.entity';
import { ClassesController } from './classes.controller';
import { ClassesService } from './services/classes.service';
import { Tasks } from './entities/tasks.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './services/tasks.service';
import { Grades } from './entities/grades.entity';
import { GradesController } from './grades.controller';
import { GradesService } from './services/grades.service';
import { RoleService } from 'src/users/services/role.service';
import { Role } from 'src/users/entities/role.entity';
import { Users } from 'src/users/entities/user.entity';
import { Access } from 'src/users/entities/access.entity';
import { Courses } from './entities/courses.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './services/courses.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Students,
      Teachers,
      Subjects,
      Classes,
      Tasks,
      Users,
      Grades,
      Role,
      Access,
      Courses,
    ]),
  ],
  controllers: [
    StudentsController,
    TeachersController,
    SubjectsController,
    ClassesController,
    TasksController,
    GradesController,
    CoursesController,
  ],
  providers: [
    StudentsService,
    TeachersService,
    SubjectsService,
    ClassesService,
    TasksService,
    RoleService,
    GradesService,
    CoursesService,
  ],
})
export class AcademicManagementModule {}
