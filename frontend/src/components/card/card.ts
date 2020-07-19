import {div, p, span, button} from '../common/defaultElement';
import {CardModel} from '../../model';

// 아직까지는 이벤트 버스가 필요없다고 생각했다.
export default class Card {
    cardModel: CardModel;

    constructor(cardModel: CardModel) {
        this.cardModel = cardModel;
    }
    render() {
        const info = this.cardModel;

        return div({className : "card"},
            div({clasName: "upside"},
                span({}, `${info.cardNo}`),
                span({}, `${info.content}`),
                button({}, "X")
            ),
            div({className: "downside"},
                span({}, `by ${info.author}`) 
            )
        );
    }
}