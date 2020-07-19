import {div, p} from '../common/defaultElement';
import ColumnHeader from './columnHeader';
import ColumnBody from './columnBody';

export default class ColumnArea {
    constructor() {
        
    }
    render() {
        return div(
            {className: "column-area"},
            (new ColumnHeader()).render(),
            (new ColumnBody()).render()
        )
    }
}