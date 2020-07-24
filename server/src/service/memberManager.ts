import { addMember, MemberModel } from "../repository/mysql";
import {
    makeSalt,
    convertPassword,
    convertPasswordWithSalt,
} from "../service/pwCrypto";
import { ResultSetHeader } from "mysql2/promise";

async function signupMember(email: string, password: string) {
    try {
        const result = await convertPassword(password);
        const convertedPassword: string = result.password;
        const salt = result.salt;

        const obj = { email, password: convertedPassword, salt };
        const newMember = new MemberModel(obj);

        const addedMemberNo = await addMember(newMember).then(
            ([rows, fields]) => {
                const memberNo = rows.insertId;
                return memberNo;
            }
        );
        return addedMemberNo;
    } catch (error) {
        throw error;
    }
}

export { signupMember };
