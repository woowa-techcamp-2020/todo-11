import {div, p, span, button} from '../common/defaultElement';

// 아직까지는 이벤트 버스가 필요없다고 생각했다.
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