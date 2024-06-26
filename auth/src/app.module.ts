import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';

  @Module({

    imports: [

      ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
      TypeOrmModule.forRoot(dataSourceOptions),
      UsersModule,
      
    ],

    controllers: [],

  })

  export class AppModule {}
