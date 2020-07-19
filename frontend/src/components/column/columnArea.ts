import {div, p} from '../common/defaultElement';
import ColumnHeader from './columnHeader';
import ColumnBody from './columnBody';
import EventBus from '../../eventBus';

export default class ColumnArea {
    eventBus: EventBus;

    constructor({eventBus}: {eventBus: EventBus}) {
        this.eventBus = eventBus;
    }
    render() {
        const eventBus = this.eventBus;
        return div(
            {className: "column-area"},
            (new ColumnHeader({eventBus})).render(),
            (new ColumnBody({eventBus})).render()
        )
    }
}