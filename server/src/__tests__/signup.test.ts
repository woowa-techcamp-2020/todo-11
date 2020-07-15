process.env.NODE_ENV = 'test';

import request from 'supertest';
import app from '..';
import {resetTable, addMember, MemberModel, poolEnd} from '../repository/mysql';

beforeAll(async () => {
    await resetTable('member_tb');
});

describe('POST /signup', () => {
    describe("성공시 201을 반환한다.", () => {
        test('맞는 아이디, 맞는 비밀번호', done => {
            request(app).post('/signup')
                .send({email:"abc123@abc.com", password:"abc"})
                .expect(201).end(done);
        });
    });
    describe("실패시 400을 반환한다", () => {
        test('아이디 X, 비밀번호 X', done => {
            request(app).post('/signup')
                .send({})
                .expect(400).end(done);
        });
        test('아이디 X, 비밀번호 O', done => {
            request(app).post('/signup')
                .send({"password": "abc1111"})
                .expect(400).end(done);
        });
        test('아이디 O, 비밀번호 X', done => {
            request(app).post('/signup')
                .send({"email":"abc111111"})
                .expect(400).end(done);
        });
        test('중복된 아이디', done => {
            request(app).post('/signup')
                .send({email:"abc123@abc.com", password:"abc"})
                .expect(400).end(done);
        })
        // test('둘다 있지만 아이디가 유효성체크에 걸림', done => {
        //     request(app).post('/signup')
        //         .send({"email":"abc", "password": "abc"})
        //         .expect(400).end(done);
        // });
        // test('둘다 있지만 비밀번호가 유효성체크에 걸림', done => {
        //     request(app).post('/signup')
        //         .send({"email":"abc", "password": "abc"})
        //         .expect(400).end(done);
        // });
    })
});

afterAll(() => {
    Promise.resolve().then(() => poolEnd());
});