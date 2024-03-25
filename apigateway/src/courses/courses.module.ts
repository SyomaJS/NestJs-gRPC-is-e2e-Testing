import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import {
  COURSE_SERVICE_NAME,
  protobufPackage,
} from '../../globals/interfaces/course';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: COURSE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50052',
          package: protobufPackage,
          protoPath: resolve(__dirname, '../../globals/protos/course.proto'),
        },
      },
    ]),
  ],

  controllers: [CoursesController],
  providers: [],
})
export class CoursesModule {}
