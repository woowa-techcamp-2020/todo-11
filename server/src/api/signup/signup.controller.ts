import {Router, Request, Response, NextFunction} from "express";
import validate from '../../service/validator';
import {checkMember, hasEmail} from '../../service/checker';
import {createGroup, joinGroup} from '../../service/groupManager';
import {signupMember} from '../../service/memberManager';
import {getMemberInfo, addDefaultColumns} from '../../repository/mysql';

const DEFAULT_GROUP_TITLE = "기본 그룹";
const DEFAULT_COLUMNS = ["해야할 일", "하는 중", "다했어"];

async function signupController(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = req.body;

        if(!validate.email(email) || !validate.password(password)) {
            res.status(400).send();
        }
        else if(await hasEmail(email)) {
            res.status(400).send();
        }
        else {
            const memberNo = await signupMember(email, password);
            
            // 그룹 만든다.
            const groupNo = await createGroup(DEFAULT_GROUP_TITLE);

            // 그룹 멤버를 만든다.
            const groupMemberNo = await joinGroup(groupNo, memberNo);
            
            // 기본 컬럼들을 만든다.
            await addDefaultColumns(DEFAULT_COLUMNS, groupNo);

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