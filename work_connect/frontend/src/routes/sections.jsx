import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';

// export const IndexPage = lazy(() => import('src/pages/app'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));
// export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
// export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const WorksListPage = lazy(() => import('../pages/workList'));
export const VideoListPage = lazy(() => import('../pages/videoList'));
export const StudentListPage = lazy(() => import('../pages/studentList'));
export const CompanyListPage = lazy(() => import('../pages/companyList'));
export const internshipJobOfferPage = lazy(() => import('../pages/internshipJobOffer'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      // children: [
      //   { element: <IndexPage />, index: true },
      //   { path: 'user', element: <UserPage /> },
      //   { path: 'products', element: <ProductsPage /> },
      //   { path: 'blog', element: <BlogPage /> },
      // ],
      children: [
        { element: <WorksListPage />, index: true },
        { path: 'VideoList', element: <VideoListPage /> },
        { path: 'StudentList', element: <StudentListPage /> },
        { path: 'CompanyList', element: <CompanyListPage /> },
        { path: 'Internship_JobOffer', element: <internshipJobOfferPage /> },
      ],
    },
    // {
    //   path: 'VideoList',
    //   element: <Page404 />,
    // },
    // {
    //   path: 'login',
    //   element: <LoginPage />,
    // },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
