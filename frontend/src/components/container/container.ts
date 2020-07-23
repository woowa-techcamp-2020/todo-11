import Header from "../header/header";
import Main from "../main/main";
import { div } from "../common/defaultElement";
import EventBus from "../../eventBus";
import { InfoModel, GroupModel, ColumnModel, CardModel } from "../../model";

export default class Container {
    header: Header;
    main: Main;
    editDialog: EditDialog;
    className?: string;
    eventBus?: EventBus;
    infos?: InfoModel;

    constructor() {
        this.init();
    }
    async init() {
        this.infos = await this.getInfo();
        this.eventBus = new EventBus();
        this.header = new Header(
            this.eventBus,
            this.infos.memberNo,
            this.infos.currentGroupNo
        );
        this.main = new Main(this.eventBus, this.infos);
        this.className = "container";

        this.eventBus.add("addCard", async (columnNo: number, content: string) => {
            // 서버에 전송하고 그 반환값을 받아온다.
            const addedCard = await fetch("http://localhost:3000/todolist/card", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    memberNo: 78,
                    columnNo: 16,
                    content,
                }),
            }).then((response) => response.json());

            const addedCardModel = new CardModel({
                cardNo: addedCard.cardNo,
                content: addedCard.content,
                orderNo: 10,
                createdAt: new Date(addedCard.createdAt),
                author: this.infos.email,
                columnNo,
            });
            const currentColumnInfo = this.infos.columnInfos.find(
                (columnInfo) => columnInfo.columnNo === columnNo
            );
            currentColumnInfo?.addCardInfo(addedCardModel);
            this.eventBus.emit(`addCardToColumn${columnNo}`, addedCardModel);
        });

        this.eventBus.add("doubleClickCard", (card: Card) => {
            const info = card.cardModel;

            this.editDialog.content = info.content;
            this.editDialog.type = "note";
            this.editDialog.setVisible();
            this.editDialog.handleSubmit = () => {
                const edited: CardModel = Object.assign(info);
                edited.content = this.editDialog.content;
                api.editCardContent(edited).then((res) => {
                    if (res.status === 200) card.cardModel = edited;
                    card.setContent(edited.content);
                });
            };
        });

        this.eventBus.add("doubleClickColumn", (column: ColumnHeader) => {
            const info = column.info;
            this.editDialog.title = info.columnTitle;
            this.editDialog.content = info.columnTitle;
            this.editDialog.type = "column";
            this.editDialog.setVisible();
            this.editDialog.handleSubmit = () => {
                console.log("ㄱㄷ");
            };
        });

        this.getInfoDB();
    }
    async getInfoDB() {
        const info = await fetch("http://localhost:3000/login/test", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "abc@abc.com",
            }),
        }).then((res) => res.json());
        debugger;
        console.log(info);
        return info;
    }
    async getInfo() {
        return new InfoModel({
            email: "abc123@abc.com",
            memberNo: 78,
            currentGroupNo: 9,
            groupInfos: [
                new GroupModel(2, "누구님의 할일 리스트"),
                new GroupModel(3, "누구님의 업무 리스트"),
                new GroupModel(4, "누구님의 주말 리스트"),
            ],
            columnInfos: [
                new ColumnModel(2, "해야할 일", 1, [
                    new CardModel({
                        cardNo: 10,
                        content: "test1",
                        orderNo: 10,
                        createdAt: new Date(),
                        author: "abc@abc.com",
                        columnNo: 2,
                    }),
                    new CardModel({
                        cardNo: 11,
                        content: "test1",
                        orderNo: 11,
                        createdAt: new Date(),
                        author: "abc@abc.com",
                        columnNo: 2,
                    }),
                    new CardModel({
                        cardNo: 12,
                        content: "test1",
                        orderNo: 12,
                        createdAt: new Date(),
                        author: "abc@abc.com",
                        columnNo: 2,
                    }),
                ]),
                new ColumnModel(3, "하는 중", 2, []),
                new ColumnModel(4, "다했어", 3, []),
            ],
        });
    }
    render() {
        return div(
            { className: this.className },
            this.header.render(),
            this.main.render()
        );
    }
}
