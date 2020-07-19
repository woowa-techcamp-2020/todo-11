import {div, p} from '../common/defaultElement';
import ColumnArea from '../column/columnArea';
import EventBus from '../../eventBus';

export default class Main {
    columns: ColumnArea[];
    eventBus: EventBus;

    constructor({eventBus}: {eventBus: EventBus}) {
        this.eventBus = eventBus;
        this.columns = [
            new ColumnArea({eventBus}),
            new ColumnArea({eventBus}),
            new ColumnArea({eventBus})
        ];
    }
    render() {
        return div(
            {className : 'main'},
            ...this.columns.map(column=>column.render())
        )
    }
} 