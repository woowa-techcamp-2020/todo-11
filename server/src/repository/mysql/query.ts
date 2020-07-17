const CREATE_MEMBER_TB: string = `CREATE TABLE member_tb (
    no INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(no)
);`

const INSERT_MEMBER_TB: string = `INSERT INTO member_tb(email, password, salt) VALUES(?, ?, ?);`;


const CREATE_GROUP_TB: string = `CREATE TABLE group_tb (
    no INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(no)
);`;

const INSERT_GROUP_TB: string = `INSERT INTO group_tb(title) VALUES(?);`;

const CREATE_GROUP_MEMBER_TB: string = `CREATE TABLE group_member_tb (
    no INT NOT NULL AUTO_INCREMENT,
    group_no INT NOT NULL,
    member_no INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(no),
    FOREIGN KEY(group_no) REFERENCES group_tb(no),
    FOREIGN KEY(member_no) REFERENCES member_tb(no)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);`;

const INSERT_GROUP_MEMBER_TB: string = `INSERT INTO group_member_tb(group_no, member_no) VALUES(?, ?);`;


const CREATE_COLUMN_TB: string = `CREATE TABLE column_tb (
    no INT NOT NULL AUTO_INCREMENT,
    order_no INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    group_no INT NOT NULL,
    PRIMARY KEY(no),
    FOREIGN KEY(group_no) REFERENCES group_tb(no)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);`;

const INSERT_COLUMN_TB: string = `INSERT INTO column_tb(order_no, title, group_no) VALUES(?, ?, ?);`;

// 카드는 해당 컬럼이 삭제되면 다 같이 날아간다.
const CREATE_CARD_TB: string = `CREATE TABLE card_tb (
    no INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(255) NOT NULL,
    order_no INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    member_no INT  NOT NULL,
    column_no INT NOT NULL,
    PRIMARY KEY(no),
    FOREIGN KEY(member_no) REFERENCES member_tb(no),
    FOREIGN KEY(column_no) REFERENCES column_tb(no)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);`;

const INSERT_CARD_TB: string = `INSERT INTO card_tb(content, order_no, member_no, column_no) VALUES(?, ?, ?, ?);`;

const CREATE_ACTIVITY_TB: string = `CREATE TABLE activity_tb (
    no INT NOT NULL AUTO_INCREMENT,
    member_no INT NOT NULL ,
    action VARCHAR(255) NOT NULL,
    card_no INT NOT NULL,
    from_column_no INT NOT NULL,
    to_column_no INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(no),
    FOREIGN KEY(member_no) REFERENCES member_tb(no),
    FOREIGN KEY(card_no) REFERENCES card_tb(no),
    FOREIGN KEY(from_column_no) REFERENCES column_tb(no),
    FOREIGN KEY(to_column_no) REFERENCES column_tb(no)

    ON UPDATE CASCADE
    ON DELETE CASCADE
);`;

const INSERT_ACTIVITY_TB = `INSERT INTO card_tb(member_no, action, card_no, from_column_no, to_column_no) VALUES(?, ?, ?, ?, ?);`;


const RESET_TB: string = `delete from ?`;

const SELECT_MEMBER: string = `select * from member_tb where email = ?`;

export default {
    CREATE_MEMBER_TB,
    INSERT_MEMBER_TB,

    CREATE_GROUP_TB,
    INSERT_GROUP_TB,

    CREATE_GROUP_MEMBER_TB,
    INSERT_GROUP_MEMBER_TB,

    CREATE_COLUMN_TB,
    INSERT_COLUMN_TB,

    CREATE_CARD_TB,
    INSERT_CARD_TB,

    CREATE_ACTIVITY_TB,
    INSERT_ACTIVITY_TB,

    SELECT_MEMBER,
    RESET_TB
}