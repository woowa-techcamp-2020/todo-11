import {Router, Request, Response, NextFunction} from "express";
import {addMember, MemberModel} from "../../repository/mysql";
import {convertPasswordWithSalt, makeSalt} from "../../service/pwCrypto";
import {signupController} from './signup.controller';
import validate from '../../service/validator';

const router = Router();

router.post("/", signupController);

export default router;