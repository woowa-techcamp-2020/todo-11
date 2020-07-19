import {getMemberInfo} from '../repository/mysql';
import {convertPasswordWithSalt} from './pwCrypto';

async function checkMember(email: string, password: string): Promise<boolean> {
    if(!email || !password) return false;

    const memberInfo = await getMemberInfo(email);    
    if(!memberInfo) return false;
    if(memberInfo.isDeleted) return false;

    const convertedPassword = await convertPasswordWithSalt(password, memberInfo.salt);
    return  convertedPassword === memberInfo.password;

}

export {checkMember};