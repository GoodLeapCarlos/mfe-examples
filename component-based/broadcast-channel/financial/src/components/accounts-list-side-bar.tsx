import { useEffect, useState } from "react";
import FinancialAppChannelHandler from "../app-channel-handler";

export default function FinancialAccountListSideBar() {
    const [financialChannel, setFinancialChannel]: any = useState();

      useEffect(() => {
        // channels
        const persistedChannel: any = new FinancialAppChannelHandler();
        setFinancialChannel(persistedChannel)

        async function closeEvents() {
            console.log('%c Financial App -> FinancialsAccountListSideBar -> Cleanup', 'background: #93c5fd; color: #000')
            await Promise.all([persistedChannel.closeChannel()])
          }
      
          return function cleanup () {
              closeEvents();
            }
    }, [])

    function onAccountListItemClick(accountNumber: number): void {
        financialChannel.postMessage(financialChannel.PublicEvents.ListSideBarItemClicked, accountNumber)
        console.log('%c Financial App -> FinancialsAccountListSideBar -> I emitted an event with ' +  accountNumber, 'background: #93c5fd; color: #000')
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