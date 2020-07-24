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
    element?: HTMLElement;
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
            async (columnNo: number, cardContent: string) => {
                const addedCard = await api.addCard(columnNo, this.infos.memberNo, cardContent).then(res => res.json());

                const addedCardModel = new CardModel({
                    cardNo: addedCard.cardNo,
                    content: addedCard.content,
                    orderNo: addedCard.orderNo,
                    createdAt: new Date(addedCard.createdAt),
                    author: this.infos.email,
                    columnNo: addedCard.columnNo,
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
                        this.editDialog.setInvisible();
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
        this.eventBus.add("getEntireData", (data: any) => {
            const infoModel = this.makeInfoModel(data);
            this.infos = infoModel;
            this.reRender();
        });
    }
    makeInfoModel(data: any) {
        return new InfoModel({
            email : data.email,
            memberNo: data.memberNo,
            currentGroupNo: data.curGroup.no,
            groupInfos: data.groups.map(group => new GroupModel(group.no, group.title)),
            columnInfos: data.columns.map(column => 
                new ColumnModel(
                    column.columnNo, 
                    column.columnTitle, 
                    column.columnOrderNo, 
                    column.cards.map(card => new CardModel({
                        cardNo: card.cardNo,
                        content: card.cardContent,
                        orderNo: card.cardNo,
                        createdAt: new Date(card.cardCreatedAt),
                        author: data.email,
                        columnNo: column.columnNo
                    }))
                )
            )
        });
    }
    getInfo() {
        return new InfoModel({
            email: "abc123@abc.com",
            memberNo: 2,
            currentGroupNo: 2,
            groupInfos: [
                // new GroupModel(2, "누구님의 할일 리스트"),
                // new GroupModel(3, "누구님의 업무 리스트"),
                // new GroupModel(4, "누구님의 주말 리스트"),
            ],
            columnInfos: [
                new ColumnModel(2, "해야할 일", 1, [
                    // new CardModel({
                    //     cardNo: 10,
                    //     content: "test1",
                    //     orderNo: 10,
                    //     createdAt: new Date(),
                    //     author: "abc@abc.com",
                    //     columnNo: 2,
                    // }),
                    // new CardModel({
                    //     cardNo: 11,
                    //     content: "test1",
                    //     orderNo: 11,
                    //     createdAt: new Date(),
                    //     author: "abc@abc.com",
                    //     columnNo: 2,
                    // }),
                    // new CardModel({
                    //     cardNo: 12,
                    //     content: "test1",
                    //     orderNo: 12,
                    //     createdAt: new Date(),
                    //     author: "abc@abc.com",
                    //     columnNo: 2,
                    // }),
                ]),
                new ColumnModel(3, "하는 중", 2, []),
                new ColumnModel(4, "다했어", 3, []),
            ],
        });
    }
    reRender() {
        this.header = new Header(
            this.eventBus,
            this.infos.memberNo,
            this.infos.currentGroupNo
        );
        this.main = new Main(this.eventBus, this.infos);
        this.editDialog = new EditDialog();

        this.element.innerHTML = "";
        this.element?.appendChild(this.header.render());
        this.element?.appendChild(this.main.render());
        this.element?.appendChild(this.editDialog);

    }
    render() {
        return this.element = div(
            { className: this.className },
            this.header.render(),
            this.main.render(),
            this.deletePopup,
            this.editDialog
        );
    }
}
