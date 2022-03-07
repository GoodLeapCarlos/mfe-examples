import { Outlet, useRoutes } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import TestPage from "./pages/test-page";
// @ts-ignore // TODO: need to figure out typing so we dont need the ignore flags
import remoteRoutes from 'mfea_app/routes';

export default function App() {

  const shellRoutes = [{
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/test-page', element: <TestPage />}
    ],
  },
  { path: "*", element: <NotFound /> }]


  let element = useRoutes(shellRoutes.concat(remoteRoutes));
  return element;
}

function Layout() {

  return (
    <div>
      <Outlet />
    </div>
  );
}
