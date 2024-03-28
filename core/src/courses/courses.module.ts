import { Module } from '@nestjs/common';
import { CoursesService } from './services/courses.service';
import { CoursesController } from './controllers/courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../globals/entities/course.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), FilesModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
