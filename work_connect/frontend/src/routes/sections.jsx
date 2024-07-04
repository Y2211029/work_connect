import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "src/layouts/dashboard";

export const SignRegistar = lazy(() => import("src/pages/SignRegistar"));
export const WorksListPage = lazy(() => import("src/pages/workList"));
export const VideoListPage = lazy(() => import("src/pages/videoList"));
export const StudentListPage = lazy(() => import("src/pages/studentList"));
export const CompanyListPage = lazy(() => import("src/pages/companyList"));
export const InternshipJobOfferPage = lazy(
  () => import("src/pages/internshipJobOffer")
);
export const Page404 = lazy(() => import("src/pages/page-not-found"));

//20240619 金田追加
export const SettingsPage = lazy(() => import('../pages/Settings'));
export const EditorPage = lazy(() => import('../pages/Editor/Editor'));

// トップ画面追加
export const TopPage = lazy(() => import('../pages/topPage'));

// 作品投稿画面追加
export const WorkPosting = lazy(() => import("src/components/account/students/WorkPosting"));

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
      children: [
        { element: <WorksListPage />, index: true },
        { path: "VideoList", element: <VideoListPage /> },
        { path: "StudentList", element: <StudentListPage /> },
        { path: "CompanyList", element: <CompanyListPage /> },
        { path: "Internship_JobOffer", element: <InternshipJobOfferPage /> },
        { path: "SignRegistar", element: <SignRegistar /> },
        //20240619 金田追加
        { path: 'Settings', element: <SettingsPage /> },
        { path: 'Editor', element: <EditorPage /> },
        // トップ画面追加
        { path: 'Top', element: <TopPage /> },
        // 作品投稿画面
        { path: "WorkPosting", element: <WorkPosting /> },
      ],
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
