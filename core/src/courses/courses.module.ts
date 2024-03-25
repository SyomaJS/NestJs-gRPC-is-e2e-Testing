import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../globals/entities/course.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), FilesModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
