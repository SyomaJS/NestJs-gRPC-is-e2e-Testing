"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRedisService = void 0;
exports.mockRedisService = {
    onModuleDestroy: jest.fn(),
    getClient: jest.fn().mockResolvedValue({}),
    ping: jest.fn().mockResolvedValue('PONG'),
    set: jest.fn().mockResolvedValue('Success'),
    get: jest.fn().mockImplementation((key) => {
        if (key === 'existingKey') {
            return Promise.resolve('value');
        }
        return Promise.resolve(null);
    }),
    exists: jest.fn().mockImplementation((key) => {
        if (key === 'existingKey') {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }),
    del: jest.fn().mockResolvedValue(1),
};
//# sourceMappingURL=redis.service.js.map