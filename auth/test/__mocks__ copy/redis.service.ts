export const mockRedisService = {

  onModuleDestroy: jest.fn(),

  getClient: jest.fn().mockResolvedValue({}),

  ping: jest.fn().mockResolvedValue('PONG'),

  set: jest.fn().mockResolvedValue(true),

  get: jest.fn().mockResolvedValue('dummyRefreshToken'),

  exists: jest.fn().mockImplementation((key: string) => {
    if (key === 'existingKey') {
      return Promise.resolve(true);
    }
    
    return Promise.resolve(false);
  }),

  del: jest.fn().mockResolvedValue(true),
};
