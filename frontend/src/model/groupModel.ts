
// 그룹만 저장.
export default class GroupModel {
    groupNo: number;
    groupTitle: string;

    constructor(groupNo: number, groupTitle: string) {
        this.groupNo = groupNo;
        this.groupTitle = groupTitle;
    }
}