"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUsersRepository = void 0;
const user_entity_1 = require("../../../globals/entities/user.entity");
const createUser = (overrides = {}) => {
    const user = new user_entity_1.User();
    user.id = overrides.id || 1;
    user.login = overrides.login || 'defaultLogin';
    user.hashedPassword = overrides.hashedPassword || 'hashedPassword';
    user.isActive = overrides.isActive !== undefined ? overrides.isActive : true;
    return user;
};
exports.mockUsersRepository = {
    create: jest.fn((createUserRequest) => createUser(createUserRequest)),
    save: jest.fn((user) => Promise.resolve(user)),
    findOneBy: jest.fn((conditions) => {
        if (conditions.login === 'existingUser') {
            return Promise.resolve(createUser({ login: conditions.login }));
        }
        return Promise.resolve(undefined);
    }),
    find: jest.fn(() => Promise.resolve([createUser()])),
    remove: jest.fn((user) => {
        if (Array.isArray(user)) {
            return Promise.resolve(user);
        }
        return Promise.resolve(user);
    }),
    merge: jest.fn((user, updateUserDto) => createUser({ ...user, ...updateUserDto })),
};
//# sourceMappingURL=user.repository.js.map