class MemberModel {
    static table: string = 'member_tb';

    no: number;
    email: string;
    password: string;
    salt: string;
    createdAt: Date;
    isDeleted: boolean;

    constructor(
        {no, email, password, salt, created_at, is_deleted} : 
        {no:number, email:string, password:string, salt:string, created_at:Date, is_deleted:boolean}
        ) {
        this.no = no;
        this.email = email;
        this.password = password;
        this.salt = salt,
        this.createdAt = created_at;
        this.isDeleted = is_deleted;
    }
}

class GroupModel {
    static table: string = 'group_tb';

    no: number;
    title: string;
    createdAt: Date;
    isDeleted: boolean;
    
    constructor(
        {no, title, created_at, is_deleted} : 
        {no: number, title: string, created_at: Date, is_deleted: boolean}
        ) {
        this.no = no;
        this.title = title;
        this.createdAt = created_at;
        this.isDeleted = is_deleted;
    }
}

class GroupMemberModel {
    static table: string = 'group_member_tb';

    no: number;
    groupNo: number;
    memberNo: number;
    createdAt: Date;
    isDeleted: boolean;

    constructor({
        no, group_no, member_no, created_at, is_deleted} : 
        {no: number, group_no: number, member_no: number, created_at: Date, is_deleted: boolean}
        ) {
        this.no = no;
        this.groupNo = group_no;
        this.memberNo = member_no;
        this.createdAt = created_at;
        this.isDeleted = is_deleted;
    }
}

class ColumnModel {
    static table: string = 'column_tb';

    no: number;
    orderNo: number;
    title: string;
    createdAt: Date;
    isDeleted: boolean;
    groupNo: number;

    constructor(
        {no, order_no, title, created_at, group_no, is_deleted}: 
        {no: number, order_no: number, title: string, created_at: Date, is_deleted: boolean, group_no: number}
        ) {
        this.no = no;
        this.orderNo = order_no;
        this.title = title;
        this.createdAt = created_at;
        this.isDeleted = is_deleted;
        this.groupNo = group_no;
    }
}

class CardModel {
    static table: string = 'card_tb';

    no: number;
    content: string;
    orderNo: number;
    createdAt: Date;
    isDeleted: boolean;
    authorNo: number;
    columnNo: number;

    constructor(
        {no, content, order_no, created_at, is_deleted, author_no, column_no}: 
        {no: number, content: string, order_no: number, created_at: Date, is_deleted: boolean, author_no: number, column_no: number}
        ) {
        this.no = no;
        this.content = content;
        this.orderNo = order_no;
        this.createdAt = created_at;
        this.isDeleted = is_deleted;
        this.authorNo = author_no;
        this.columnNo = column_no;
    }
}

export {
    MemberModel,
    GroupModel,
    GroupMemberModel,
    ColumnModel,
    CardModel
};