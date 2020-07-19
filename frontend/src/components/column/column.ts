import {div, p} from '../common/defaultElement';
import ColumnHeader from './columnHeader';
import ColumnBody from './columnBody';

export default class Column {
    constructor() {
        
    }
    render() {
        return div(
            {className: "column"},
            (new ColumnHeader()).render(),
            (new ColumnBody()).render()
        )
    }
}