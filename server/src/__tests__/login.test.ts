
process.env.NODE_ENV = 'test';

import request from 'supertest';
import app from '..';
import {makeSalt, convertPassword} from '../service/pwCrypto';
import {resetTable, addMember, MemberModel, poolEnd} from '../repository/mysql';

const TEST_EMAIL = "abc@abc.com";
const TEST_PASSWORD = "abc";

beforeAll(async () => {
    await resetTable('member_tb');
    const result: {password: string, salt: string} = await convertPassword(TEST_PASSWORD);
    const member = new MemberModel({
        no: 0, email:TEST_EMAIL, password: result.password, salt:result.salt, created_at : new Date()
    });
    await addMember(member);
});

describe('POST /login은', () => {
    describe("성공시 201을 반환한다.", () => {
        test('맞는 아이디, 맞는 비밀번호', done => {
            request(app).post('/login')
                .send({email: TEST_EMAIL, password: TEST_PASSWORD})
                .expect(201).end(done);
        });
    });

    describe('실패시 400을 반환한다', () => {
        test('없는 아이디', done => {
            request(app).post('/login')
                .send({email: `${TEST_EMAIL}asjdhflajkhd`, password: TEST_PASSWORD})
                .expect(400).end(done);        
        });
        test('이메일 프로퍼티가 아예 없음', done => {
            request(app).post('/login')
                .send({password: TEST_PASSWORD})
                .expect(400).end(done);
        });
        test('비밀번호 프로퍼티가 아예 없음', done => {
            request(app).post('/login')
                .send({email: TEST_EMAIL})
                .expect(400).end(done);        
        });
        test('틀린 비밀번호', done => {
            request(app).post('/login')
                .send({email: TEST_EMAIL, password :`${TEST_PASSWORD}1241241}`})
                .expect(400).end(done);
        });
    });
});

afterAll(() => {
    Promise.resolve().then(() => poolEnd());
});