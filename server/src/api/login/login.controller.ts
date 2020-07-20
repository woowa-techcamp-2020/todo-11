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
        const curGroup = groups[0]; // 쿼리에서 순서 정렬을 해서 뽑아오기 때문에 첫번째 그룹을 사용하면 된다.

        const columnCard = await getGroupColumnCard(memberInfo.no, curGroup.no);
        const test: string = JSON.stringify(columnCard);

        req.session!.columnsNo = columnCard.map(one => one.columnNo);

        req.session!.groupsNo = groups.map(group => group.no);

        const info = {
            memberNo: memberInfo.no,
            email: memberInfo.email,
            memberCreatedAt: memberInfo.createdAt,
            groups,
            curGroup: curGroup,
            columns: columnCard
        }
        res.status(201).send(info);
    }
}

export {loginController}