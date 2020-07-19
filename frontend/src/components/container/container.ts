import Header from '../header/header';
import Main from '../main/main';
import { div } from '../common/defaultElement';
import EventBus from '../../eventBus';

export default class Container {
    header: Header;
    main : Main;
    className : string;
    eventBus: EventBus;

    constructor(
        {eventBus} 
        : {eventBus: EventBus}
        ) {
        // 안에서 개별 컴포넌트를 가지고 있다가
        // 변경 사항 생기면 render()로 호출한다.
        // 전체가 아니라 변경사항이 생긴 컴포넌트에 
        // render를 호출하면 알아서 자기들 안에서만 다시 적용되도록..
        this.eventBus = eventBus;
        this.header = new Header({eventBus});
        this.main = new Main({eventBus});
        this.className = "container";
    }
    render() {
        return div(
            {className: this.className},
            this.header.render(),
            this.main.render()
        );
    }
}