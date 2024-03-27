/// <reference types="jest" />
export declare const mockRedisService: {
    onModuleDestroy: jest.Mock<any, any, any>;
    getClient: jest.Mock<any, any, any>;
    ping: jest.Mock<any, any, any>;
    set: jest.Mock<any, any, any>;
    get: jest.Mock<any, any, any>;
    exists: jest.Mock<any, any, any>;
    del: jest.Mock<any, any, any>;
};
