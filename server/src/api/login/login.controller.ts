import {checkMember} from '../../service/checker';
import {getMemberInfo, MemberModel, getGroupsBelongMember, getGroupColumnCard} from '../../repository/mysql';
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


        const groups = await getGroupsBelongMember(memberInfo.no);
        const curGroup = groups[0]; // 최소 하나는 있음

        const columnCard = await getGroupColumnCard(memberInfo.no, curGroup.no);
        const test: string = JSON.stringify(columnCard);

        // columnNo배열
        req.session!.columnsNo = columnCard.map(one => one.columnNo);
        // groupNo배열
        req.session!.groupsNo = groups.map(group => group.no);
        const info = {
            memberNo: memberInfo.no,
            email: memberInfo.email,
            memberCreatedAt: memberInfo.createdAt,
            groups,
            curGroup: curGroup,
            columns: columnCard
        }
        console.log(JSON.stringify(info));
        res.status(201).send(info);
    }
}

export {loginController}