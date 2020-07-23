import { div, p, span, button } from "../common/defaultElement";
import EventBus from "../../eventBus";
import { CardModel } from "../../model";

export default class Card {
    eventBus: EventBus;
    cardModel: CardModel;
    element?: any;
    movingCardElement?: HTMLElement;
    startX: number;
    startY: number;
    belowAreaFlag: [HTMLElement, string, HTMLElement | null];

    constructor(eventBus: EventBus, cardModel: CardModel) {
        this.eventBus = eventBus;
        this.cardModel = cardModel;
        this.moveCard = this.moveCard.bind(this);
        this.startX = this.startY = 0;
        this.belowAreaFlag = [];
    }
    moveCard(e: any) {
        e.preventDefault();
        const clientX = e.clientX;
        const clientY = e.clientY;
        const cards = this.element?.parentElement?.querySelectorAll(".card");
        const columns = document.querySelectorAll(".column-body");

        const currentPositionElements = document.elementsFromPoint(clientX, clientY);
        const changeCards = currentPositionElements.filter((one) =>
            [].includes.call(cards, one)
        );
        const currentColumn = [].find.call(columns, (one) =>
            currentPositionElements.includes(one)
        );

        const cardElement: HTMLElement = this.element;
        if (changeCards.length == 0) {
            // 영역 밖을 나가는 것도 있기 때문에 currenColumn을 체크해줘야 한다.
            if (currentColumn) {
                if (
                    this.belowAreaFlag[0] !== currentColumn ||
                    this.belowAreaFlag[1] !== "beforeend"
                ) {
                    const targetElement: HTMLElement = currentColumn;
                    this.belowAreaFlag = [currentColumn, "beforeend", null];
                    targetElement.insertAdjacentElement("beforeend", cardElement);
                    console.log(0);
                }
            }
        } else if (changeCards.length == 1) {
            const targetElement = changeCards[0];
            if (targetElement === cardElement) {
                console.log(11);
            } else if (targetElement.previousElementSibling === cardElement) {
                if (
                    this.belowAreaFlag[0] !== currentColumn ||
                    this.belowAreaFlag[1] !== "afterend" ||
                    this.belowAreaFlag[2] !== targetElement
                ) {
                    this.belowAreaFlag = [currentColumn, "afterend", targetElement];
                    targetElement.insertAdjacentElement("afterend", cardElement);
                    console.log(22);
                }
            } else {
                if (
                    this.belowAreaFlag[0] !== currentColumn ||
                    this.belowAreaFlag[1] !== "beforebegin" ||
                    this.belowAreaFlag[2] !== targetElement
                ) {
                    this.belowAreaFlag = [currentColumn, "beforebegin", targetElement];
                    targetElement.insertAdjacentElement("beforebegin", cardElement);
                }
            }
        }

        this.movingCardElement!.style.transform = `
            translate(${clientX - this.startX}px, ${clientY - this.startY}px)`;
    }
    setContent(content: string) {
        const contentElement: HTMLSpanElement | null = this.element?.querySelector(
            ".card-content"
        );
        contentElement!.innerText = content;
    }
    render() {
        const info = this.cardModel;
        return (this.element = div(
            {
                className: "card",
            },
            div(
                {
                    className: "wrap",
                },

                div(
                    {
                        className: "upside",
                        ondblclick: e => {
                            if(e.target.className === "deleteButton") return;
                            this.eventBus.emit("doubleClickCard", this);
                        },
                    },
                    span({ className: "icon" }, `${info.cardNo}`),
                    span({ className: "content" }, `${info.content}`),
                    button({ 
                        className: "deleteButton" , 
                        onclick : (e: Event) => {
                            this.eventBus.emit("deleteCard", this);
                            this.eventBus.emit(`deleteCardToColumn${this.cardModel.columnNo}`, this);
                        },
                    }, "X")
                ),
                div(
                    {
                        className: "downside",
                        onmousedown: (e: any) => {
                            const parentElement = this.element?.parentElement;
                            const startX = (this.startX = e.pageX);
                            const startY = (this.startY = e.pageY);
                            const cardElement = this.element;
        
                            e.preventDefault();
                            const movingCardElement: any = (this.movingCardElement = this.element!.cloneNode(
                                this.element
                            ));
                            movingCardElement.firstChild.classList.add("moving-card");
                            movingCardElement!.style.position = "absolute";
                            movingCardElement!.onmouseup = (e) => {
                                cardElement!.style.opacity = "1";
                                document.removeEventListener("mousemove", this.moveCard);
                                movingCardElement!.style.opacity = "0";
                                setTimeout(() => {
                                    document.body.removeChild(movingCardElement);
                                }, 200);
                            };
        
                            let rect = this.element?.getBoundingClientRect();
                            movingCardElement.style.width = e.currentTarget.offsetWidth + "px";
        
                            movingCardElement!.style.left =
                                startX - (e.clientX - rect!.left) + "px";
        
                            movingCardElement!.style.top =
                                startY - (e.clientY - rect!.top) + "px";
        
                            document.body.appendChild(movingCardElement);
                            cardElement!.style.opacity = "0.5";
                            document.addEventListener("mousemove", this.moveCard);
                        },
                        
                    },
                    span({}, `by ${info.author}`)
                )
            )
        ));
    }
}
