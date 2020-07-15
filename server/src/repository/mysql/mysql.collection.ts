class MemberModel {
    static table: string = 'member_tb';

    no: number;
    email: string;
    password: string;
    salt: string;
    createdAt: Date;

    constructor({no, email, password, salt, created_at} : {no:number, email:string, password:string, salt:string, created_at:Date}) {
        this.no = no;
        this.email = email;
        this.password = password;
        this.salt = salt,
        this.createdAt = created_at;
    }
}

class GroupModel {
    static table: string = 'group_tb';

    no: number;
    title: string;
    createdAt: Date;
    
    constructor({no, title, created_at} : {no: number, title: string, created_at: Date}) {
        this.no = no;
        this.title = title;
        this.createdAt = created_at;
    }
}

class GroupMemberModel {
    static table: string = 'group_member_tb';

    no: number;
    groupNo: number;
    memberNo: number;
    createdAt: Date;

    constructor({no, group_no, member_no, created_at} : {no: number, group_no: number, member_no: number, created_at: Date}) {
        this.no = no;
        this.groupNo = group_no;
        this.memberNo = member_no;
        this.createdAt = created_at;
    }
}

class ColumnModel {
    static table: string = 'column_tb';

    no: number;
    orderNo: number;
    title: string;
    createdAt: Date;
    groupNo: number;

    constructor({no, order_no, title, created_at, group_no}: {no: number, order_no: number, title: string, created_at: Date, group_no: number}) {
        this.no = no;
        this.orderNo = order_no;
        this.title = title;
        this.createdAt = created_at;
        this.groupNo = group_no;
    }
}

class CardModel {
    static table: string = 'card_tb';

    no: number;
    content: string;
    orderNo: number;
    createdAt: Date;
    authorNo: number;
    columnNo: number;

    constructor({no, content, order_no, created_at, author_no, column_no}: {no: number, content: string, order_no: number, created_at: Date, author_no: number, column_no: number}) {
        this.no = no;
        this.content = content;
        this.orderNo = order_no;
        this.createdAt = created_at;
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
// const models = {
//     MemberModel,
//     GroupModel,
//     GroupMemberModel,
//     ColumnModel,
//     CardModel
// };

// export default models;