import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function startCore() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50052',
        package: ['file', 'course'],
        protoPath: [
          join(__dirname, '../protos/file.proto'),
          join(__dirname, '../protos/course.proto'),
        ],
        maxReceiveMessageLength: 100 * 1024 * 1024, 
        maxSendMessageLength: 100 * 1024 * 1024, 
      },
    },
  );

  await app.listen();
}

startCore();
