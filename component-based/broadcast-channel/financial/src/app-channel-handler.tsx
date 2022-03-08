// TODO: need interfaces for message body
// type event = {
//     name: string,
//     data: any
// }
import { BroadcastChannel, createLeaderElection } from 'broadcast-channel';
import { APP_CHANNEL_EVENTS_PUBLIC } from './app-channel-events';

export default class FinancialAppChannelHandler {

    private channelName: string = '8b37283ab5cefinancial';
    private channel: BroadcastChannel;
    private registeredEvents: any[] = [];
    private elector: any;

    public PublicEvents = APP_CHANNEL_EVENTS_PUBLIC;

    // ?: Add component name that is initializing channel?
    constructor() {
        const options = {
            type: 'localstorage' as any, // (optional) enforce a type, oneOf['native', 'idb', 'localstorage', 'node']
            webWorkerSupport: false // (optional) set this to false if you know that your channel will never be used in a WebWorker (increases performance)
        };
        this.channel = new BroadcastChannel(this.channelName, options);
        this.channel.onmessage = msg => this.handleMessage(msg);

        this.elector = createLeaderElection(this.channel);
        this.elector.onduplicate = () => {
        alert('have duplicate leaders!');
        }

        console.log(`initiated FinancialAppChannelHandler within a component! broadcast-channel-name: ${this.channel.name} | broadcast-channel-id: ${this.channel.id}`);
    }

    public getChannel(): BroadcastChannel {
        return this.channel
    }

    public closeChannel(): Promise<void> {
        // clear registered events
        this.registeredEvents = [];
        return this.channel.close();
    }

    private handleMessage(message: any): void {
        this.registeredEvents.forEach((event) => {
            if(message.eventName === event.eventName) {
                event.execute(message.data);
            }
        })
    }

    public onMessage(_eventName: typeof this.PublicEvents[keyof typeof this.PublicEvents], _func: Function): void {

        this.registeredEvents.push({
            eventName: _eventName,
            execute: _func
        })
    }

    public postMessage(_eventName: typeof this.PublicEvents[keyof typeof this.PublicEvents], _data?: any): void {
        this.channel.postMessage({
            eventName: _eventName,
            data: _data
        });
    }
}
