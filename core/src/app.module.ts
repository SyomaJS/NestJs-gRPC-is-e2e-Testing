import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { dataSourceOptions } from '../db/data-source';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    FilesModule,
    CoursesModule,

    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../globals', 'media'),
      serveRoot: '/media',
      exclude: ['/media/index.html'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

/* 

{
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }

    */
