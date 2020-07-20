import {checkMember} from '../../service/checker';
import {getMemberInfo, MemberModel} from '../../repository/mysql';
import {Request, Response, NextFunction} from 'express';


async function loginController(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body;
    
    if(!await checkMember(email, password)) {
        res.status(400).send();
    }
    else {
        const memberInfo: MemberModel = await getMemberInfo(email);

        req.session!.isLogined = true;
        req.session!.memberNo = memberInfo.no;
        req.session!.email = memberInfo.email;
        req.session!.createdAt = memberInfo.createdAt;


        res.status(201).send();
    }
}

export {loginController}