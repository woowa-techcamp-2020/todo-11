import mysql, {RowDataPacket} from 'mysql2/promise';
import config from '../../config';
import query from './query';
import {MemberModel, GroupModel, GroupMemberModel, ColumnModel, CardModel} from './mysql.collection';

// pool.execute<mysql.RowDataPacket[]>('select * from member_tb where email =?;', ["a@a"]).then((response) => {
//     const [rows, fields] = response;
//     const {no, email, password, salt, created_at} = rows[0];
//     console.log(`${no} ==== ${email} ==== ${password} ==== ${salt} ==== ${created_at}`);
// });


const pool = mysql.createPool({
    host : config.host,
    user : config.dbUser,
    password : config.dbPassword,
    database : config.dbName,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
});

async function addMember(member: MemberModel) {
    const {email, password, salt} = member;
    return await pool.execute(query.INSERT_MEMBER_TB, [email, password, salt]);
}

async function addGroup(group: GroupModel) {
    const {title} = group;
    return await pool.execute(query.INSERT_GROUP_TB, [title]);
}

async function resetTable(tableName: string) {
    const resetQuery = query.RESET_TB.replace('?', tableName);
    return await pool.execute(resetQuery);
}
async function getMemberInfo(email: string) {
    const [rows, fields] = await pool.execute<RowDataPacket[]>(query.SELECT_MEMBER, [email]);
    if(rows.length === 0) return null;
    const memberInfo = rows[0];
    return memberInfo;
}

function poolEnd() {
    pool.end();
}

export {
    addMember,
    addGroup,
    getMemberInfo,
    resetTable,
    poolEnd
}