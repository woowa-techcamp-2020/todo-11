import {Router, Request, Response, NextFunction} from "express";
import validate from '../../service/validator';
import {signupMember} from '../../service/memberManager';
import {getMemberInfo} from '../../repository/mysql';

async function signupController(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = req.body;

        if(!validate.email(email) || !validate.password(password)) {
            res.status(400).send();
        }
        else if(await getMemberInfo(email)) {
            res.status(400).send();
        }
        else {
            await signupMember(email, password);
            res.status(201).send();
        }
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
}

export {
    signupController
}