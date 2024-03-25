import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../globals/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule, RedisModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
