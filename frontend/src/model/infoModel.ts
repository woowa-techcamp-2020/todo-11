import GroupModel from './groupModel';
import ColumnModel from './columnModel';

export default class InfoModel {

    email: string;
    memberNo: number;
    currentGroupNo: number;
    groupInfos: GroupModel[];
    columnInfos: ColumnModel[];

    constructor(info: any) {
        this.email = info.email;
        this.memberNo = info.memberNo;
        this.currentGroupNo = info.currentGroupNo;
        this.groupInfos = info.groupInfos;
        this.columnInfos = info.columnInfos;
    }

}