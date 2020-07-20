import {addMember, MemberModel} from '../repository/mysql';
import {makeSalt, convertPassword, convertPasswordWithSalt} from '../service/pwCrypto';

async function signupMember(email: string, password: string) {
    try {
        const result = await convertPassword(password);
        const convertedPassword: string = result.password;
        const salt = result.salt;

        const obj = {email, password: convertedPassword, salt};
        const newMember = new MemberModel(obj);
        
        const addedMemberNo = await addMember(newMember).then(([rows, field]) => {
            const memberNo = rows.insertId;
            return memberNo;
        });
        return addedMemberNo;
    } catch (error) {
        throw error;
    }
}

export {
    signupMember
}