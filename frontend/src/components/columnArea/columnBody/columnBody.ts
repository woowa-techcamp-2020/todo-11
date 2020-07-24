import { div, p, span } from "../../common/defaultElement";
import Card from "../../card/card";
import EventBus from "../../../eventBus";
import { ColumnModel, CardModel } from "../../../model";
import api from "../../../api";

const className = "column-body";

export default class ColumnBody {
    eventBus: EventBus;
    element: HTMLElement;
    columnInfo: ColumnModel;

    constructor(eventBus: EventBus, columnInfo: ColumnModel) {
        this.eventBus = eventBus;
        this.columnInfo = columnInfo;
        this.element = div(
            { className },
            ...columnInfo.cardInfos.map((cardInfo) =>
                new Card(this.eventBus, cardInfo).render()
            )
        );

        // event 등록
        eventBus.add(`addCardToColumn${columnInfo.columnNo}`, (data: any) =>
            this.addCard(data)
        );
        eventBus.add(`deleteCardToColumn${columnInfo.columnNo}`, async (card: Card) => {
            const ressult = await api.deleteCard(card.cardModel.cardNo);
            if(ressult.status === 200) {
                this.columnInfo.removeCardInfo(card.cardModel);
                this.element.removeChild(card.element);
            }
        });
    }
    render() {
        return this.element;
    }
    addCard(cardModel: CardModel) {
        this.element.insertAdjacentElement(
            "afterbegin",
            new Card(this.eventBus, cardModel).render()
        );
    }
}
