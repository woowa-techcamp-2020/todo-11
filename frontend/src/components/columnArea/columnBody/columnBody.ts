import { div, p, span } from "../../common/defaultElement";
import Card from "../../card/card";
import EventBus from "../../../eventBus";
import { ColumnModel, CardModel } from "../../../model";

const className = "column-body";

export default class ColumnBody {
    eventBus: EventBus;
    element: HTMLElement;
    columnInfo?: ColumnModel;

    constructor(eventBus: EventBus, columnInfo: ColumnModel) {
        this.eventBus = eventBus;
        this.columnInfo = columnInfo;
        this.element = div(
            { className },
            ...columnInfo.cardInfos.map((cardInfo) => new Card(cardInfo).render())
        );

        // event 등록
        eventBus.add(`addCardToColumn${columnInfo.columnNo}`, (data: any) =>
            this.addCard(data)
        );
    }
    render() {
        return this.element;
    }
    addCard(cardModel: CardModel) {
        this.element.insertAdjacentElement("afterbegin", new Card(cardModel).render());
    }
}
