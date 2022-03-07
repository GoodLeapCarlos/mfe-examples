import { BroadcastChannel } from 'broadcast-channel';

export default function DisplayDate() {
    let date = new Date().toISOString();
    const channel: BroadcastChannel<any> = new BroadcastChannel('foobar');
    channel.onmessage = (msg: any) => {
        console.log(msg, 'received!');
      };
    return (
        <>
                { date } 
        </>
    )
}