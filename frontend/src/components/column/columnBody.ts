import {div, p, span} from '../common/defaultElement';

export default class ColumnBody {
    constructor() {
        
    }
    render() {
        return div({}, 
                span({}, "컬럼 바디입니다.")
            )
    }
}