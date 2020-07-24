type CardModelProps = {
    cardNo: number
    content: string;
    orderNo: number;
    createdAt: Date;
    author: string;
    columnNo: number;
}
export default class CardModel {
    cardNo: number;
    content: string;
    orderNo: number;
    createdAt: Date;
    author: string;
    columnNo: number;
    
    constructor({cardNo, content, orderNo, createdAt, author, columnNo}: CardModelProps) {
        this.cardNo = cardNo;
        this.content = content; 
        this.orderNo = orderNo; 
        this.createdAt = createdAt; 
        this.author = author; 
        this.columnNo = columnNo;
    }
}