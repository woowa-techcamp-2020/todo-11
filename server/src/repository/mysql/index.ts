// import mysql from "mysql2";
import mysql, { QueryError, RowDataPacket, FieldPacket } from "mysql2/promise";

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'qkrcjfgns',
    database : 'todolist',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
});

pool.query<mysql.RowDataPacket[]>('select * from member_tb;').then((response) => {
    const [rows, fields] = response;
    const {mno, email, password, salt} = rows[0];
    console.log(`${mno} ==== ${email} ==== ${password} ==== ${salt}`);
    console.log(rows[1]);
});
