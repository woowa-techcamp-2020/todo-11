import {div, p} from '../common/defaultElement';
import ColumnArea from '../column/columnArea';

export default class Main {
    columns: ColumnArea[];
    constructor() {
        this.columns = [
            new ColumnArea(),
            new ColumnArea(),
            new ColumnArea()
        ];
    }
    render() {
        return div(
            {className : 'main'},
            ...this.columns.map(column=>column.render())
        )
    }
} 