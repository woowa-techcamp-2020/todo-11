import { div, textarea, button } from '../common/defaultElement';
import EventBus from '../../eventBus';

export default class AddCardArea {
    element: HTMLElement;
    eventBus: EventBus;

    constructor({eventBus}: {eventBus: EventBus}) {
        this.eventBus = eventBus;
        this.element = 
            div({
                className: "add-card-area hide"
            },
                textarea({
                    placeholder : "Enter a not",
                    onkeyup: (event:Event) => this.addButtonActive(event),
                }, null),
                button({
                    className: "add-button", 
                    disabled: true
                }, "Add"),
                button({onclick : () => this.toggle()}, "Cancel")
            );

    }
    toggle() {
        this.element.classList.toggle('hide');
    }
    addButtonActive(event: Event) {
        const eventTarget: any | null = event.target;
        const button: HTMLButtonElement | null = this.element.querySelector('.add-button');
        if(button === null) throw "button이 존재하지 않습니다.";
        
        if(eventTarget.value.trim().length < 1) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    }
    render() {
        return this.element;
    }
}