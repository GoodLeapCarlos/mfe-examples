import FinancialAppChannelHandler from "financial_app/FinancialAppChannelHandler";
import { useEffect } from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

export default function NavBar() {
  
  function shellCallBack(msg: any) {
    console.log('%c Shell App -> NavBar -> Side Bar List Item Clicked!', 'background: #fca5a5; color: #000')
  }
  
  
  useEffect(() => {
    // channels
    const financialChannel = new FinancialAppChannelHandler()
  
    // actions
    financialChannel.onMessage(financialChannel.PublicEvents.ListSideBarItemClicked, shellCallBack)
  
  //     setTimeout(function(){
  //         financialChannel.postMessage(financialChannel.PublicEvents.ListItemClicked, 'test')
  //         financialChannel.postMessage(financialChannel.PublicEvents.ListItemClicked, 'YOYO')
  //    }, 10000);
  
  
  
    async function closeEvents() {
        await financialChannel.closeChannel();
      }
  
      return function cleanup () {
        console.log('%c Shell App -> FinancialAccountsListPage -> Cleanup', 'background: #fca5a5; color: #000')
          closeEvents();
        }
  }, [])

  function CustomLink({ children, to, ...props }: LinkProps) {
        let resolved = useResolvedPath(to);
        let match = useMatch({ path: resolved.pathname, end: true });
      
        return (
          <div>
            <Link
              className={(match) ? 'text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6' : 'border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'}
              to={to}
              {...props}
            >
              {children}
            </Link>
          </div>
        );
      }
    return (<div className='border-4 border-red-300 mb-2'>
        <div className="absolute top-0 left-1 text-sm font-medium">Shell App - Nav</div>
    <nav className="bg-white shadow dark:bg-gray-800">
    <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
    <CustomLink to="/">Home</CustomLink>
    <CustomLink to="/financial-accounts">Financial Accounts List</CustomLink>
    <CustomLink to="/test-page">Test Page</CustomLink>
    </div>
</nav>
</div>
    )
}