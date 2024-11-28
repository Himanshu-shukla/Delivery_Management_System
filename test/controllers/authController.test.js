"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../src/models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const mongoose_1 = __importDefault(require("mongoose"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect('mongodb://localhost/test_db');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('Auth Controller', () => {
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'password', role: 'User' });
        expect(response.status).toBe(201);
    }));
    it('should login an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new userModel_1.default({ email: 'test@example.com', password: yield bcrypt_1.default.hash('password', 10), role: 'User' });
        yield user.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    }));
});
