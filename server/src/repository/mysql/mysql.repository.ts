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
async function addMemberDeleted(member: MemberModel) {
    const {email, password, salt} = member;
    return await pool.execute(query.INSERT_MEMBER_TB_DELETED, [email, password, salt]);
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
    
    const info = rows[0];

    const memberModel = new MemberModel({
        no : info.no, 
        email : info.email, 
        password : info.password, 
        salt : info.salt, 
        created_at : info.created_at, 
        is_deleted : info.is_deleted
    });
    
    return memberModel;
}

function poolEnd() {
    pool.end();
}

export {
    addMember,
    addMemberDeleted,
    addGroup,
    getMemberInfo,
    resetTable,
    poolEnd
}