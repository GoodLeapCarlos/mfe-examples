import { useEffect } from "react";
import FinancialAppEventsHandler from "../../app-events-handler";

export default function DisplayDate() {
    let date = new Date().toISOString();


    useEffect(() => {
        const financialEvents = new FinancialAppEventsHandler();

        console.log('%c Financial App -> DisplayDate -> Emit new message', 'background: #93c5fd; color: #000')
        financialEvents.emit(financialEvents.PublicEvents.ListSideBarItemClicked, 'HAASDASDADAD')
    
        async function closeEvents() {
          await financialEvents.clean();
        }
    
        return function cleanup () {
          console.log('%c Financial App -> DisplayDate -> Cleanup', 'background: #93c5fd; color: #000')
            closeEvents();
          }
    }, [])

    return (
        <div className="border-4 border-blue-300">
        <div className="text-sm font-medium">Financial App - DisplayDate</div>
                { date }
        </div>
    )
}