import Header from "../header/header";
import Main from "../main/main";
import { div } from "../common/defaultElement";
import EventBus from "../../eventBus";
import EditDialog from "../EditDialog";
import api from "../../api";
import { InfoModel, GroupModel, ColumnModel, CardModel } from "../../model";
import Card from "../card/card";
import ColumnHeader from "../columnArea/columnHeader/columnHeader";
import utils from "../../utils";
import DeletePopup from "../DeletePopup";

export default class Container {
    header: Header;
    main: Main;
    className: string;
    eventBus: EventBus;
    infos: InfoModel;
    editDialog: EditDialog;
    deletePopup: DeletePopup;

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
        this.deletePopup = new DeletePopup();
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
            this.editDialog.setVisible();
            utils.setParams(this.editDialog, {
                type: "note",
                content: info.content,
                handleSubmit: () => {
                    const edited: CardModel = Object.assign(info);
                    edited.content = this.editDialog.content;
                    api.editCardContent(edited).then((res) => {
                        if (res.status === 200) card.cardModel = edited;
                        card.setContent(edited.content);
                    });
                },
            });
        });
        this.eventBus.add("doubleClickColumn", (column: ColumnHeader) => {
            const info = column.info;
            this.editDialog.setVisible();
            utils.setParams(this.editDialog, {
                type: "column",
                title: info.columnTitle,
                content: info.columnTitle,
                handleSubmit: () => {},
            });
        });
        this.eventBus.add("deleteCard", (card: Card) => {
            this.deletePopup.setVisible();
            utils.setParams(this.deletePopup, {
                type: "card",
                handleConfirm: () => {
                    api.deleteCard(card.cardModel).then((res) =>
                        console.log(res)
                    );
                },
            });
        });
        this.eventBus.add("deleteColumn", (column: ColumnHeader) => {
            this.deletePopup.setVisible();
            utils.setParams(this.deletePopup, {
                type: "column",
                handleConfirm: () => {
                    api.deleteColumn(column.info).then((res) =>
                        console.log(res)
                    );
                },
            });
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
            this.deletePopup,
            this.editDialog
        );
    }
}
