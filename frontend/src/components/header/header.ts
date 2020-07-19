import {div, p, span, a} from '../common/defaultElement';
import EventBus from '../../eventBus';
// activity관련 값을 가져온다.
// memberNo, currentColumnNo 가 필요하다.
export default class Header {
    eventBus: EventBus;
    constructor(eventBus: EventBus, memberNo: number, currentColumnNo: number) {
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