// ?: Do we pass events from other domains via props or import them into our webpack.config?

import { useEffect, useState } from "react"
// import financialAppChannelSingleton from "../app-channel-singleton";
import FinancialAppEventsHandler from "../app-events-handler";

export default function FinancialAccountsListDetails() {
  const [detailsID, setDetailsId]: any = useState(0);
  
  useEffect(() => {
    const financialEvents = new FinancialAppEventsHandler();

    financialEvents.on(financialEvents.PublicEvents.ListSideBarItemClicked, ((msg: any) => {
      setDetailsId(msg);
      console.log('%c Financial App -> FinancialAccountsListDetails -> Update Details with: ' + msg, 'background: #93c5fd; color: #000')
    }))

    async function closeEvents() {
      console.log('%c Financial App -> FinancialAccountsListDetails -> Cleanup', 'background: #93c5fd; color: #000')
      await Promise.all([financialEvents.clean()])
    }

    return function cleanup () {
        closeEvents();
      }
}, [])
return (
  <div className='border-4 border-blue-300 ml-2 px-4 py-4'>

{/* <div className="w-full h-full p-4 m-8 overflow-y-auto">
    <div className="flex items-center justify-center p-40 border-4 border-dotted">
      <List></List>
    </div>
  </div> */}


<div className="relative rounded-xl overflow-auto">
<div className="text-sm text-center font-medium">Financial App - FinancialAccountsListDetail</div>
<strong>
{detailsID === 0 ? 'Please select an account to review' :
`Fetching Data with ID: ${detailsID}`
}</strong>
</div>
    </div>
)
}