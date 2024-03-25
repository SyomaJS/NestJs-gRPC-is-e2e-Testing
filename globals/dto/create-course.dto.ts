import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateCourseRequest } from '../interfaces/course';

export class CreateCourseDto implements CreateCourseRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  courseName: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  duration: number;
}
