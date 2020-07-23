import { div, p, span, button } from "../../common/defaultElement";
import AddCardArea from "./addCardArea/addCardArea";
import EventBus from "../../../eventBus";
import { ColumnModel } from "../../../model";

export default class ColumnHeader {
    eventBus: EventBus;
    info: ColumnModel;
    addCardArea: AddCardArea;
    element: HTMLElement;

    constructor(eventBus: EventBus, columnInfo: ColumnModel) {
        this.eventBus = eventBus;
        eventBus.add(`addCardToColumn${columnInfo.columnNo}`, () =>
            this.updateCardCount()
        );
        // 컬럼 갯수를 받아와야 한다.
        this.info = columnInfo;
        this.addCardArea = new AddCardArea(eventBus, columnInfo.columnNo);
        this.element = div(
            { className: "column-header" },
            div(
                { className: "column-info" },
                div(
                    {},
                    span(
                        { className: "column-card-counter" },
                        this.info.getCardCount()
                    ),
                    span(
                        {
                            className: "column-title",
                            ondblclick: () => {
                                this.eventBus.emit("doubleClickColumn", this);
                            },
                        },
                        this.info.columnTitle
                    )
                ),
                div(
                    {},
                    button({ onclick: () => this.toggle() }, "+"),
                    button(
                        {
                            onclick: () =>
                                this.eventBus.emit("deleteColumn", this),
                        },
                        "X"
                    )
                )
            ),
            this.addCardArea.render()
        );
    }
    updateCardCount() {
        this.element.querySelector(
            ".column-card-counter"
        ).innerHTML = this.info.getCardCount();
    }
    setTitle(title: string) {
        this.element.getElementsByClassName(
            "column-title"
        )[0].textContent = title;
    }
    toggle() {
        this.addCardArea.toggle();
    }
    render() {
        return this.element;
    }
}
