import {div, p, span, button} from '../common/defaultElement';
import AddCardArea from './addCardArea';
import EventBus from '../../eventBus';

export default class ColumnHeader {
    eventBus: EventBus;
    columnCount: number;
    columnTitle: string;
    addCardArea: AddCardArea;
    element: HTMLElement;

    constructor({eventBus}: {eventBus: EventBus}) {
        this.eventBus = eventBus;
        // 컬럼 갯수를 받아와야 한다. 
        this.columnCount = 0;
        this.columnTitle = "해야할 일";
        this.addCardArea = new AddCardArea({eventBus});
        this.element = 
            div({className : "column-header",},
                div(
                    {className : "column-info"},
                    div({}, 
                        span({}, this.columnCount),
                        span({}, this.columnTitle),
                    ),
                    div({},
                        button({'onclick':() => this.toggle()}, '+'),
                        button({}, 'X')
                    )
                ),
                this.addCardArea.render()
            );
    }
    toggle() {
        this.addCardArea.toggle();
    }
    render() {
        return this.element;
    }
}

