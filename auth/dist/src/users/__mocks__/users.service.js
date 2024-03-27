"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUsersService = void 0;
const users_stub_1 = require("../test/stubs/users.stub");
exports.mockUsersService = {
    signup: jest.fn().mockImplementation((createUserRequest) => {
        return Promise.resolve((0, users_stub_1.usersStub)());
    }),
    login: jest.fn().mockImplementation((loginUserRequest) => {
        return Promise.resolve({ user: (0, users_stub_1.usersStub)(), tokens: users_stub_1.tokens });
    }),
    findOne: jest.fn().mockImplementation((id) => {
        return Promise.resolve((0, users_stub_1.usersStub)());
    }),
    logout: jest.fn().mockImplementation((logoutUserRequest) => {
        return Promise.resolve((0, users_stub_1.usersStub)());
    }),
    findAll: jest.fn().mockImplementation(() => {
        return Promise.resolve([(0, users_stub_1.usersStub)()]);
    }),
    update: jest.fn().mockImplementation((id, updateUserRequest) => {
        return Promise.resolve((0, users_stub_1.usersStub)());
    }),
    remove: jest.fn().mockImplementation((id) => {
        return Promise.resolve((0, users_stub_1.usersStub)());
    }),
};
//# sourceMappingURL=users.service.js.map