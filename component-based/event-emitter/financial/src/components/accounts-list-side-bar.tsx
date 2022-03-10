import { useEffect, useState } from "react";
import FinancialAppEventsHandler from "../app-events-handler";
// import financialAppChannelSingleton from "../app-channel-singleton";

export default function FinancialAccountListSideBar() {
    const [financialEventsChannel, setFinancialEventsChannel]: any = useState();

      useEffect(() => {
          
        // channels
        const persistedEvent = new FinancialAppEventsHandler();
        setFinancialEventsChannel(persistedEvent)
        // actions
        persistedEvent.on(persistedEvent.PublicEvents.ListSideBarItemClicked, ((msg: any) => {
            console.log('%c Financial App -> FinancialsAccountListSideBar -> I saw the event myself..here was the message: ' + msg, 'background: #93c5fd; color: #000')
        }))


        persistedEvent.on(persistedEvent.PublicEvents.ListSideBarRefresh, ((msg: any) => {
            console.log('%c Financial App -> FinancialsAccountListSideBar -> I saw a different event..here was the message: ' + msg, 'background: #93c5fd; color: #000')
        }))
        
        // !: accounts list details doesnt update because it wasn't loaded before this event fired. We need to think of a solution for late subscribers
        persistedEvent.emit(persistedEvent.PublicEvents.ListSideBarItemClicked, 1234553)
        
        async function closeEvents() {
            console.log('%c Financial App -> FinancialsAccountListSideBar -> Cleanup', 'background: #93c5fd; color: #000')
            await Promise.all([persistedEvent.clean()])
          }
      
          return function cleanup () {
              closeEvents();
            }
    }, [])

    function onAccountListItemClick(accountNumber: number): void {
        console.log('%c Financial App -> FinancialsAccountListSideBar -> I emitted an event with ' + accountNumber, 'background: #93c5fd; color: #000')
        financialEventsChannel.emit(financialEventsChannel.PublicEvents.ListSideBarItemClicked, accountNumber)
        // financialEventsChannel.emit(financialEventsChannel.PublicEvents.ListSideBarRefresh, 'REFRESHED!')
    }


    return (
        <div className='border-4 border-blue-300'>
<div className="flex flex-col w-64 h-screen py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600 mt-5">
        <div className="text-sm text-center font-medium">Financial App - FinancialAccountListSideBar</div>
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">Financial Accounts</h2>

        <div className="flex flex-col flex-1 mt-6">
                <button onClick={() => {
                    onAccountListItemClick(252066261);
                }} className="flex items-center max-w-full px-4 py-2 border-b-2 border-b-gray-200">
                    <span className="mx-4 font-medium">#252066261</span>
                </button>

                <button onClick={() => {
                    onAccountListItemClick(564358374);
                }} className="flex items-center max-w-full px-4 py-2 border-b-2 border-b-gray-200">
                    <span className="mx-4 font-medium">#564358374</span>
                </button>

                <button onClick={() => {
                    onAccountListItemClick(594309482);
                }} className="flex items-center max-w-full px-4 py-2 border-b-2 border-b-gray-200">
                    <span className="mx-4 font-medium">#594309482</span>
                </button>

                <button onClick={() => {
                    onAccountListItemClick(799978142);
                }} className="flex items-center max-w-full px-4 py-2 border-b-2 border-b-gray-200">
                    <span className="mx-4 font-medium">#799978142</span>
                </button>
        </div>
    </div>
        </div>
    )
}