//routes.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import FundingTest from './pages/funding-test';
import Home from './pages/home';
import NotFound from './pages/not-found';
const TestRoute = React.lazy(() => import('./pages/home'));
const FundingRoutes = [
    {
      path: "/funding/",
      element: <Layout />,
      children: [
        { index: true, element: (
          <React.Suspense fallback={<>...</>}>
                <Home />
              </React.Suspense>
        ) },
        { path: '/funding/test', element: <FundingTest />}
      ],
    },
    { path: "*", element: <NotFound /> },
  ]

  function Layout() {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

export default FundingRoutes;