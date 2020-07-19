import {div, p} from '../common/defaultElement';
import Column from '../column/column';

export default class Main {
    columns: Column[];
    constructor() {
        this.columns = [
            new Column(),
            new Column(),
            new Column()
        ];
    }
    render() {
        return div(
            {className : 'main'},
            ...this.columns.map(column=>column.render())
        )
    }
} 