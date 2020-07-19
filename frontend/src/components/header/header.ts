import {div, p, span, a} from '../common/defaultElement';
import EventBus from '../../eventBus';

export default class Header {
    eventBus: EventBus;
    constructor({eventBus}: {eventBus: EventBus}) {
        this.eventBus = eventBus;
    }
    render() {
        return div(
            {className: "header"},
            span({}, "헤더입니다."),
            a({href : '#'}, "menu")
        )
    }
}