import { div, textarea, button } from "../../../common/defaultElement";
import EventBus from "../../../../eventBus";
import { CardModel } from "../../../../model";

export default class AddCardArea {
    element: HTMLElement;
    eventBus: EventBus;
    columnNo: number;

    constructor(eventBus: EventBus, columnNo: number) {
        this.eventBus = eventBus;
        this.columnNo = columnNo;

        this.element = div(
            {
                className: "add-card-area hide",
            },
            textarea(
                {
                    placeholder: "Enter a not",
                    onkeyup: (event: Event) => this.addButtonActive(event),
                },
                null
            ),
            button(
                {
                    className: "add-button",
                    onclick: (event: Event) => {
                        this.addCard(event);
                        this.textAreaReset();
                    },
                    disabled: true,
                },
                "Add"
            ),
            button({ onclick: () => this.toggle() }, "Cancel")
        );
    }
    toggle() {
        this.element.classList.toggle("hide");
    }
    textAreaReset() {
        const textArea = this.element.querySelector("textarea");
        textArea!.value = "";
    }
    addCard(event: Event) {
        const content = this.element.querySelector("textarea")?.value;
        this.eventBus.emit("addCard", this.columnNo, content);
        this.element.querySelector(".add-button")!.disabled = true;
    }
    addButtonActive(event: Event) {
        const button: HTMLButtonElement = this.element.querySelector(".add-button");

        if (event.target.value.trim().length < 1) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    }
    render() {
        return this.element;
    }
}
