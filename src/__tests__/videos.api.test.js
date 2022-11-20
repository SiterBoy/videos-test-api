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
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../index");
describe('/videos', () => {
    beforeAll(() => {
        (0, supertest_1.default)(src_1.app).delete('/testing/alldata');
    });
    it('Should return 200 and 0 elem in Array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).get('/videos').expect(200);
    }));
    it('Should return 404 on non-existing id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).get('/videos/-23').expect(404);
    }));
    it('Should return error if creating without author', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(src_1.app).post('/videos/').send({ title: '123' });
        console.log(response);
    }));
});
