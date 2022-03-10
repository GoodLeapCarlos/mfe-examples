import { Outlet, useRoutes } from "react-router-dom";
import FinancialAccountsListPage from "./pages/financial-accounts-list-page";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import TestPage from "./pages/test-page";
import NavBar from "./shared/nav-bar";

// const channel: BroadcastChannel<any> = new BroadcastChannel('foobar');
export default function App() {

  const mainRoutes = [{
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/financial-accounts', element: <FinancialAccountsListPage />},
      { path: '/test-page', element: <TestPage />}
    ],
  },
  { path: "*", element: <NotFound /> }]


  let element = useRoutes(mainRoutes);
  return element;
}

function Layout() {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet />
    </div>
  );
}
