"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = exports.usersStub = void 0;
const usersStub = () => {
    return {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        hashedPassword: 'jfoiwjf8934jf8934jfqij.jf430fj024jf.4ljfoj423f',
        isActive: true,
    };
};
exports.usersStub = usersStub;
exports.tokens = {
    accessToken: 'testAccessToken',
    refreshToken: 'testRefreshToken',
};
//# sourceMappingURL=users.stub.js.map