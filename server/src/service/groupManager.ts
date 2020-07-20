    
import {addGroup, addGroupMember, GroupModel} from '../repository/mysql';

// 그룹 생성
async function createGroup(title: string) {
    const newGroup = new GroupModel({title});
    const groupNo = await addGroup(newGroup).then(([rows, field]) => {
        const groupNo = rows.insertId;
        return groupNo;
    });

    return groupNo;
}

async function joinGroup(groupNo: number, memberNo: number) {
    const groupMemberNo = await addGroupMember(groupNo, memberNo).then(([rows, field]) => {
        const groupMemberNo = rows.insertId;
        return groupMemberNo;
    });
    return groupMemberNo;
}

async function getGroupInfo() {
    
}

export {
    createGroup,
    joinGroup
}


// 그룹 추가
// 그룹 수정
// 그룹 삭제
// 그룹에 멤버 추가

// 컬럼 생성
// 컬럼 삭제
// 컬럼 수정