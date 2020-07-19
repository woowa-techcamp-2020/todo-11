import {div, p, span, a} from '../common/defaultElement';

export default class Header {

    render() {
        return div(
            {className: "header"},
            span({}, "헤더입니다."),
            a({href : '#'}, "menu")
        )
    }
}