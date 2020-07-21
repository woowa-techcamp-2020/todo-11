const CREATE_MEMBER_TB: string = `CREATE TABLE member_tb (
    no INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted bool default false,
    PRIMARY KEY(no)
);`;

const INSERT_MEMBER_TB: string = `INSERT INTO member_tb(email, password, salt) VALUES(?, ?, ?);`;
const INSERT_MEMBER_TB_DELETED: string = `INSERT INTO member_tb(email, password, salt, is_deleted) VALUES(?, ?, ?, true);`;

const CREATE_GROUP_TB: string = `CREATE TABLE group_tb (
    no INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted bool default false,
    PRIMARY KEY(no)
);`;

const INSERT_GROUP_TB: string = `INSERT INTO group_tb(title) VALUES(?);`;

const CREATE_GROUP_MEMBER_TB: string = `CREATE TABLE group_member_tb (
    no INT NOT NULL AUTO_INCREMENT,
    group_no INT NOT NULL,
    member_no INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted bool default false,
    PRIMARY KEY(no),
    FOREIGN KEY(group_no) REFERENCES group_tb(no),
    FOREIGN KEY(member_no) REFERENCES member_tb(no)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);`;

const INSERT_GROUP_MEMBER_TB: string = `INSERT INTO group_member_tb(group_no, member_no) VALUES(?, ?);`;

const SELECT_GROUP_MEMBER_TB_WHERE_MEMBER: string = `
    SELECT 
        group_no, group_tb.created_at AS created_at, group_tb.title
    FROM 
        group_member_tb
    JOIN
        group_tb
    ON 
        group_member_tb.group_no = group_tb.no
    WHERE
        group_member_tb.member_no = ?;
`;

const CREATE_COLUMN_TB: string = `CREATE TABLE column_tb (
    no INT NOT NULL AUTO_INCREMENT,
    order_no INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted bool default false,
    group_no INT NOT NULL,
    PRIMARY KEY(no),
    FOREIGN KEY(group_no) REFERENCES group_tb(no)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);`;

const INSERT_COLUMN_TB: string = `INSERT INTO column_tb(order_no, title, group_no) VALUES(?, ?, ?);`;
const INSERT_DEFAULT_COLUMN_TB: string = `INSERT INTO column_tb(order_no, title, group_no) VALUES(?, ?, ?),(?, ?, ?), (?, ?, ?);`;

// 카드는 해당 컬럼이 삭제되면 다 같이 날아간다.
const CREATE_CARD_TB: string = `CREATE TABLE card_tb (
    no INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(255) NOT NULL,
    order_no INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted bool default false,
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
    is_deleted bool default false,

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

const SELECT_ONE_CARD: string = `
    SELECT 
        no AS cardNo, 
        content, 
        order_no AS orderNo, 
        created_at AS createdAt, 
        member_no AS memberNo, 
        column_no AS columnNo 
    FROM 
        card_tb 
    WHERE 
        no = ? AND is_deleted = 0;`;

const SELECT_MEMBER: string = `select * from member_tb where email = ?`;

const SELECT_GROUP_COLUMN_CARD_TB = `
    select 
        column_tb.no AS column_no, column_tb.title AS column_title, column_tb.order_no AS column_order, column_tb.created_at AS column_created_at,
        card_tb.no AS card_no, card_tb.content AS card_content, card_tb.created_at AS card_created_at, card_tb.order_no AS card_order,
        member_tb.no AS member_no, member_tb.email AS email 
    FROM 
        group_member_tb
    JOIN 
        member_tb
    ON 
        group_member_tb.member_no = member_tb.no 
    JOIN 
        column_tb 
    ON 
        group_member_tb.group_no = column_tb.group_no
    JOIN 
        card_tb
    ON
        card_tb.column_no = column_tb.no
    WHERE 
        member_tb.no = ?
        AND group_member_tb.group_no = ?
        AND member_tb.is_deleted = 0 
        AND group_member_tb.is_deleted = 0
        AND column_tb.is_deleted = 0
        AND card_tb.is_deleted = 0
    ORDER BY 
        column_tb.group_no ASC,
        column_order ASC,
        card_order DESC;`;

const SELECT_MAX_CARD_ORDER = `
    SELECT MAX(order_no) as order_no 
    FROM card_tb
    WHERE column_no = ?;
`;

const UPDATE_CARD = `
    UPDATE card_tb 
    SET content=?, order_no=?, column_no=? 
    WHERE no = ?;
`;

const DELETE_CARD = `
    UPDATE card_tb
    SET is_deleted=1
    where no = ?
`;

export default {
    CREATE_MEMBER_TB,
    INSERT_MEMBER_TB,
    INSERT_MEMBER_TB_DELETED,

    CREATE_GROUP_TB,
    INSERT_GROUP_TB,

    CREATE_GROUP_MEMBER_TB,
    INSERT_GROUP_MEMBER_TB,
    SELECT_GROUP_MEMBER_TB_WHERE_MEMBER,

    CREATE_COLUMN_TB,
    INSERT_COLUMN_TB,
    INSERT_DEFAULT_COLUMN_TB,

    CREATE_CARD_TB,
    INSERT_CARD_TB,
    SELECT_MAX_CARD_ORDER,

    CREATE_ACTIVITY_TB,
    INSERT_ACTIVITY_TB,

    SELECT_MEMBER,
    SELECT_GROUP_COLUMN_CARD_TB,
    RESET_TB,
    SELECT_ONE_CARD,
    UPDATE_CARD,
    DELETE_CARD,
};
