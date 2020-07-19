import {div, p, span} from '../common/defaultElement';
import Card from '../card/card';
import EventBus from '../../eventBus';

const className = "column-body";

export default class ColumnBody {
    eventBus: EventBus;

    constructor({eventBus}: {eventBus: EventBus}) {
        this.eventBus = eventBus;
    }
    render() {
        return div({className}, 
            (new Card).render(),
            (new Card).render(),
            (new Card).render()
        )
    }
}