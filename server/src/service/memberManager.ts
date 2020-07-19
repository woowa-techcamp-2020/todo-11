import {addMember, MemberModel} from '../repository/mysql';
import {makeSalt, convertPasswordWithSalt} from '../service/pwCrypto';

async function signupMember(email: string, password: string) {
    try {
        const salt = await makeSalt();
        const convertedPassword = await convertPasswordWithSalt(password, salt);
        const obj = {no: 0, email, password: convertedPassword, salt, created_at: new Date(), is_deleted: false};
        const newMember = new MemberModel(obj);
        
        await addMember(newMember);
    } catch (error) {
        throw error;
    }
}

export {
    signupMember
}