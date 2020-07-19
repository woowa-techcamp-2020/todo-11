import {div, p} from '../common/defaultElement';
import ColumnArea from '../columnArea/columnArea';
import EventBus from '../../eventBus';
import InfoModel from '../../model/infoModel';

/**
 * {
 *  email: string
 *  memberNo: number
 *  currentGourpNo: number
 *  columnInfos: ColumnModel[], columnInfo의 orderNo 순서로
 * }
 */
export default class Main {
    columns: ColumnArea[];
    eventBus: EventBus;
    infoModel :InfoModel;

    // 사용쟈와 현재 컬럼 정보

    constructor(eventBus: EventBus, infoModel: InfoModel) {
        this.infoModel = infoModel;
        this.eventBus = eventBus;
        this.columns = infoModel.columnInfos.map(columnInfo =>  
            new ColumnArea(eventBus, columnInfo));
    }
    render() {
        return div(
            {className : 'main'},
            ...this.columns.map(column=>column.render())
        )
    }
} 