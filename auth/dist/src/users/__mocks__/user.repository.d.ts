/// <reference types="jest" />
import { Repository } from 'typeorm';
import { User } from '../../../globals/entities/user.entity';
export declare const mockUsersRepository: jest.Mocked<Repository<User>>;
