import {div, p, span, button} from '../common/defaultElement';


export default class Card {
    render() {
        return div({className : "card"},
            div({clasName: "upside"},
                span({}, '[1]'),
                span({}, "페이지 네이션 UI 처리"),
                button({}, "X")
            )
        );
    }
}