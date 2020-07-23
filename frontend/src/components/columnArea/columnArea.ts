import { div, p } from "../common/defaultElement";
import ColumnHeader from "./columnHeader/columnHeader";
import ColumnBody from "./columnBody/columnBody";
import EventBus from "../../eventBus";
import { ColumnModel } from "../../model";

// 현재 그룹
// 현재 컬럼
export default class ColumnArea {
    eventBus: EventBus;
    columnInfo?: ColumnModel;
    columnHeader: ColumnHeader;
    columnBody: ColumnBody;

    constructor(eventBus: EventBus, columnInfo: ColumnModel) {
        this.eventBus = eventBus;
        this.columnInfo = columnInfo;
        this.columnHeader = new ColumnHeader(eventBus, columnInfo);
        this.columnBody = new ColumnBody(eventBus, columnInfo);
    }
    render() {
        const eventBus = this.eventBus;
        return div(
            { className: "column-area" },
            this.columnHeader.render(),
            this.columnBody.render()
        );
    }
}
