export default class EventBus {
    private events: Map<string, Array<Function>>;
    constructor() {
        this.events = new Map();
    }
    add(eventName: string, callBack: Function) {
        if(!this.events.has(eventName)) {
            this.events.set(eventName, [callBack]);
        } else {
            this.events.get(eventName)?.push(callBack);
        }
    }
    emit(eventName: string) {
        if(!this.events.has(eventName)) throw `${eventName}에 콜백이 하나도 등록되어 있지 않습니다.`;
        if(this.events.get(eventName)?.length == 0) throw `${eventName}에 콜백이 하나도 등록되어 있지 않습니다.`;
        const callBacks = this.events.get(eventName);
        callBacks?.forEach(callBack => callBack());
    }
}