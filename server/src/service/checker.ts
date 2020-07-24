import {getMemberInfo, MemberModel} from '../repository/mysql';
import {convertPasswordWithSalt} from './pwCrypto';

async function hasEmail(email: string) {
    if(!email) return false;
    const memberInfo = await getMemberInfo(email);
    if(memberInfo === MemberModel.NONE) return false;
    if(memberInfo.isDeleted) return false;
    return true;
}

async function checkMember(email: string, password: string): Promise<boolean> {

    // email, password 동시에 쿼리로 돌릴수 있게 수정해야 한다.
    if(!email || !password) return false;

    const memberInfo = await getMemberInfo(email);    
    if(memberInfo === MemberModel.NONE) return false;
    if(memberInfo.isDeleted) return false;

    const convertedPassword = await convertPasswordWithSalt(password, memberInfo.salt);
    return  convertedPassword === memberInfo.password;
}

export {checkMember, hasEmail};