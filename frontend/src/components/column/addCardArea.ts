import { div, textarea, button } from '../common/defaultElement';

export default class AddCardArea {
    element: HTMLElement;

    constructor() {
        this.element = 
            div({
                className: "add-card-area hide"
            },
                textarea({placeholder : "Enter a not"}, null),
                button({}, "Add"),
                button({onclick : () => this.toggle()}, "Cancel")
            )
    }
    toggle() {
        this.element.classList.toggle('hide');
    }
    render() {
        return this.element;
    }
}