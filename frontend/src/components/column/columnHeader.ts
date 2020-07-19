import {div, p, span, button} from '../common/defaultElement';
import AddCardArea from './addCardArea';

export default class ColumnHeader {
    columnCount: number;
    columnTitle: string;
    addCardArea: AddCardArea;
    element: HTMLElement;

    constructor() {
        // 컬럼 갯수를 받아와야 한다. 
        this.columnCount = 0;
        this.columnTitle = "해야할 일";
        this.addCardArea = new AddCardArea();
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

