import Header from "../header/header";
import Main from "../main/main";
import { div } from "../common/defaultElement";
import EventBus from "../../eventBus";
import { InfoModel, GroupModel, ColumnModel, CardModel } from "../../model";

export default class Container {
    header: Header;
    main: Main;
    className: string;
    eventBus: EventBus;
    infos: InfoModel;

    constructor() {
        this.infos = this.getInfo();
        this.eventBus = new EventBus();
        this.header = new Header(
            this.eventBus,
            this.infos.memberNo,
            this.infos.currentGroupNo
        );
        this.main = new Main(this.eventBus, this.infos);
        this.className = "container";
        this.eventBus.add("addCard", (columnNo: number, cardContent: string) => {
            // 서버에 전송하고 그 반환값을 받아온다.

            const addedCardModel = new CardModel({
                cardNo: 10,
                content: cardContent,
                orderNo: 10,
                createdAt: new Date(),
                author: this.infos.email,
                columnNo,
            });
            const currentColumnInfo = this.infos.columnInfos.find(
                (columnInfo) => columnInfo.columnNo === columnNo
            );
            currentColumnInfo?.addCardInfo(addedCardModel);
            this.eventBus.emit(`addCardToColumn${columnNo}`, addedCardModel);
        });
    }
    getInfo() {
        return new InfoModel({
            email: "abc123@abc.com",
            memberNo: 2,
            currentGroupNo: 2,
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
