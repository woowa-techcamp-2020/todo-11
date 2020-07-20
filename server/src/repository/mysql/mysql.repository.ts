import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import config from '../../config';
import query from './query';
import {
    MemberModel,
    GroupModel,
} from './mysql.collection';

// pool.execute<mysql.RowDataPacket[]>('select * from member_tb where email =?;', ["a@a"]).then((response) => {
//     const [rows, fields] = response;
//     const {no, email, password, salt, created_at} = rows[0];
//     console.log(`${no} ==== ${email} ==== ${password} ==== ${salt} ==== ${created_at}`);
// });


const pool = mysql.createPool({
    host: config.host,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function addMember(member: MemberModel) {
    const { email, password, salt } = member;
    return await pool.execute<ResultSetHeader>(query.INSERT_MEMBER_TB, [email, password, salt])
}
async function addMemberDeleted(member: MemberModel) {
    const { email, password, salt } = member;
    return await pool.execute(query.INSERT_MEMBER_TB_DELETED, [email, password, salt]);
}

async function addGroup(group: GroupModel) {
    const { title } = group;
    return await pool.execute<mysql.ResultSetHeader>(query.INSERT_GROUP_TB, [title]);
}

async function addGroupMember(groupNo: number, memberNo: number) {
    return await pool.execute<mysql.ResultSetHeader>(query.INSERT_GROUP_MEMBER_TB, [groupNo, memberNo]);
}


async function getGroupsBelongMember(memberNo: number) {
    return await pool.execute<RowDataPacket[]>(query.SELECT_GROUP_MEMBER_TB_WHERE_MEMBER, [memberNo]).then(([rows, field]) => {
        const result = rows.map(row => {
            const obj = Object.create(null);
            obj.title = row.title;
            obj.no = row.group_no;
            obj.createdAt = row.created_at;
            return obj
        });
        return result
    });
}

async function getGroupColumnCard(memberNo: number, groupNo: number) {
    return await pool.execute<RowDataPacket[]>(query.SELECT_GROUP_COLUMN_CARD_TB, [memberNo, groupNo]).then(([rows, field]) => {
        const result: any[] = [];
        let preColumnNo: number;
        let curColumn: {
            columnNo: number, 
            columnTitle: string, 
            columnOrderNo: number, 
            columnCreatedAt: Date, 
            cards:any[]
        };

        rows.forEach(row => {
            if(preColumnNo !== row.column_no) {
                preColumnNo = row.column_no;
                curColumn = {
                    columnNo: row.column_no,
                    columnTitle: row.column_title,
                    columnOrderNo: row.column_order,
                    columnCreatedAt: row.column_created_at,
                    cards: []
                };
                result.push(curColumn);
            }
            curColumn.cards.push({
                cardNo: row.card_no,
                cardContent: row.card_content,
                cardCreatedAt: row.card_created_at,
                cardOrderNO: row.card_order
            });
        });
        return result;
    });
}

async function addDefaultColumns(titles: string[], groupNo: number) {
    return await pool.execute<mysql.RowDataPacket[]>(query.INSERT_DEFAULT_COLUMN_TB, [1, titles[0], groupNo, 2, titles[1], groupNo, 3, titles[2], groupNo]);
}

async function resetTable(tableName: string) {
    const resetQuery = query.RESET_TB.replace('?', tableName);
    return await pool.execute(resetQuery);
}
async function getMemberInfo(email: string): Promise<MemberModel> {
    const [rows, fields] = await pool.execute<RowDataPacket[]>(query.SELECT_MEMBER, [email]);
    if (rows.length === 0) return MemberModel.NONE;

    const info = rows[0];

    const memberModel = new MemberModel({
        no: info.no,
        email: info.email,
        password: info.password,
        salt: info.salt,
        created_at: info.created_at,
        is_deleted: info.is_deleted
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
    addGroupMember,
    getGroupsBelongMember,
    addDefaultColumns,
    getMemberInfo,
    getGroupColumnCard,
    resetTable,
    poolEnd
}