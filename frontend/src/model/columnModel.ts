import CardModel from './cardModel';

export default class ColumnModel {
    columnNo: number;
    columnTitle: string;
    columnOrder: number;
    cardInfos: CardModel[];

    constructor(columnNo: number, columnTitle: string, columnOrder: number, cardInfos: CardModel[]) {
        this.columnOrder = columnOrder;
        this.columnNo = columnNo;
        this.columnTitle = columnTitle;
        this.cardInfos = cardInfos;
    }
    addCardInfo(cardInfo: CardModel) {
        this.cardInfos.push(cardInfo);
    }
    getCardCount(): number {
        return this.cardInfos.length;
    }
}