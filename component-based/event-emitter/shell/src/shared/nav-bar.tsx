import { useEffect } from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import FinancialAppEventsHandler from 'financial_app/FinancialAppEventsHandler';
export default function NavBar() {

  useEffect(() => {
    const financialEvents = new FinancialAppEventsHandler();
    financialEvents.on(financialEvents.PublicEvents.ListSideBarItemClicked, ((msg: any) => {
      console.log('%c Shell App: NavBar -> I saw the event three..here was the message: ' + msg, 'background: #fca5a5; color: #000')
    }))


    async function closeEvents() {
      console.log('%c Financial App -> NavBar -> Cleanup', 'background: #93c5fd; color: #000')
      await  financialEvents.clean()
    }

    return function cleanup () {
        closeEvents();
      }
  }, []);
  
  function CustomLink({ children, to, ...props }: LinkProps) {
        let resolved = useResolvedPath(to);
        let match = useMatch({ path: resolved.pathname, end: true });
      
        return (
          <div>
            <Link
              className={(match) ? 'text-gray-800 transition-colors duration-200 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6' : 'border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'}
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