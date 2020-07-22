import Header from "../header/header";
import Main from "../main/main";
import { div } from "../common/defaultElement";
import EventBus from "../../eventBus";
import EditDialog from "../EditDialog";
import api from "../../api";
import { InfoModel, GroupModel, ColumnModel, CardModel } from "../../model";
import Card from "../card/card";
import ColumnHeader from "../columnArea/columnHeader/columnHeader";

export default class Container {
    header: Header;
    main: Main;
    className: string;
    eventBus: EventBus;
    infos: InfoModel;
    editDialog: EditDialog;

    constructor() {
        this.infos = this.getInfo();
        this.eventBus = new EventBus();
        this.header = new Header(
            this.eventBus,
            this.infos.memberNo,
            this.infos.currentGroupNo
        );
        this.main = new Main(this.eventBus, this.infos);
        this.editDialog = new EditDialog();
        this.className = "container";
        this.eventBus.add(
            "addCard",
            (columnNo: number, cardContent: string) => {
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
                this.eventBus.emit(
                    `addCardToColumn${columnNo}`,
                    addedCardModel
                );
            }
        );
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
                new ColumnModel(2, "해야할 일", 1, []),
                new ColumnModel(3, "하는 중", 2, []),
                new ColumnModel(4, "다했어", 3, []),
            ],
        });
    }
    render() {
        return div(
            {
                className: this.className,
            },
            this.header.render(),
            this.main.render(),
            this.editDialog
        );
    }
}
