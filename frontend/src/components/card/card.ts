import { div, p, span, button } from "../common/defaultElement";
import EventBus from "../../eventBus";
import { CardModel } from "../../model";

// 아직까지는 이벤트 버스가 필요없다고 생각했다.
export default class Card {
    eventBus: EventBus;
    cardModel: CardModel;
    element?: any;

    constructor(eventBus: EventBus, cardModel: CardModel) {
        this.eventBus = eventBus;
        this.cardModel = cardModel;
    }
    setContent(content: string) {
        const contentElement: HTMLSpanElement | null = this.element?.querySelector(
            ".card-content"
        );
        contentElement!.innerText = content;
    }
    render() {
        const info = this.cardModel;

        this.element = div(
            {
                className: "card",
                ondblclick: () => {
                    this.eventBus.emit("doubleClickCard", this);
                },
            },
            div(
                { clasName: "upside" },
                span({}, `${info.cardNo}`),
                span({ className: "card-content" }, `${info.content}`),
                button(
                    {
                        onclick: () => {
                            this.eventBus.emit("deleteCard", this);
                        },
                    },
                    "X"
                )
            ),
            div({ className: "downside" }, span({}, `by ${info.author}`))
        );
        return this.element;
    }
}
