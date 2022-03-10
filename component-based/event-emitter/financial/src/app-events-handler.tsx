// TODO: need interfaces for message body
// type event = {
//     name: string,
//     data: any
// }

import EventEmitter from 'eventemitter3';
import { nanoid } from 'nanoid/non-secure'
import { APP_EVENTS } from './app-events';

export default class FinancialAppEventsHandler {
    private applicationName = 'financial-app'
    private eventId: string = ''
    private EE: EventEmitter;
    private windowName: string = 'gl-e-e3b83c1f-c0e7-4430-8f13-3fac2e1231ce'
    public PublicEvents = APP_EVENTS;

    constructor() {
        console.log('initiate FinancialAppEvents');

        // TODO: Add error handling
        let _window = (window as any);
        if (!_window[this.windowName]) {
            _window[this.windowName] = new EventEmitter();
            console.log(typeof _window[this.windowName])
        }
        
        this.EE = _window[this.windowName];
        this.eventId = `component-${nanoid()}`;
    }

    public clean(): void {
        // clear registered events
        let events = this.EE.eventNames().filter((event: any) => {
            return event.includes(this.eventId)
        })

        console.log(events)
        events.forEach((event: any) => {
            this.EE.removeListener(event);
        })
    }

    public on(_eventName: typeof this.PublicEvents[keyof typeof this.PublicEvents], _func: any): void {
        this.EE.on(`${this.eventId}:${this.applicationName}:${_eventName}`, _func);
    }

    public emit(_eventName: typeof this.PublicEvents[keyof typeof this.PublicEvents], _data?: any): void {
        let events = this.EE.eventNames().filter((event: any) => {
            return event.includes(`${this.applicationName}:${_eventName}`);
        })

        events.forEach((event) => {
            this.EE.emit(event, _data);
        });
        // this.EE.emit(_eventName, _data);
    }
}
