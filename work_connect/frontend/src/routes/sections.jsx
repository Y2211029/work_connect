import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "src/layouts/dashboard";

// 新規登録
export const SignRegistar = lazy(() => import("src/pages/SignRegistar"));

// トップ画面
export const TopPage = lazy(() => import("../pages/topPage"));

// 作品投稿画面
export const WorkPosting = lazy(() => import("src/components/account/students/WorkPosting"));
// 動画投稿画面
export const VideoPosting = lazy(() => import("src/components/account/students/VideoPosting"));

// 作品・動画・学生・企業一覧画面
export const WorksListPage = lazy(() => import("src/pages/workList"));
export const VideoListPage = lazy(() => import("src/pages/videoList"));
export const StudentListPage = lazy(() => import("src/pages/studentList"));
export const CompanyListPage = lazy(() => import("src/pages/companyList"));

// 作品・動画・学生・企業詳細画面
export const WorkDetail = lazy(() => import("src/sections/WorkList/view/WorkDetail"));
export const VideoDetail = lazy(() => import("src/sections/VideoList/view/VideoDetail"));

// export const StudentListPage = lazy(() => import("src/sections/WorkList/view/WorkDetail.jsx"));
// export const CompanyListPage = lazy(() => import("src/sections/WorkList/view/WorkDetail.jsx"));

// 設定画面
export const SettingsPage = lazy(() => import("src/pages/Settings"));

//
export const InternshipJobOfferPage = lazy(() => import("src/pages/internshipJobOffer"));
//
export const EditorPage = lazy(() => import("src/pages/Editor/Editor"));

// リンク無し画面
export const Page404 = lazy(() => import("src/pages/page-not-found"));

//プロフィール
export const ProfilePage = lazy(() => import("src/pages/Profile"));

//20240704 金田追加
export const NewsDetailPage = lazy(() => import('src/sections/InternshipJobOffer/news_detail'));


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: "SignRegistar", element: <SignRegistar /> },

        { element: <WorksListPage />, index: true },
        { path: "VideoList", element: <VideoListPage /> },
        { path: "StudentList", element: <StudentListPage /> },
        { path: "CompanyList", element: <CompanyListPage /> },
        { path: "Internship_JobOffer", element: <InternshipJobOfferPage /> },

        { path: "WorkDetail/:id", element: <WorkDetail /> },
        { path: "VideoDetail/:id", element: <VideoDetail /> },

        //20240619 金田追加
        { path: "Settings", element: <SettingsPage /> },
        { path: "Editor", element: <EditorPage /> },
        //20240704 金田追加
        { path: "news_detail", element: <NewsDetailPage /> },

        // トップ画面追加
        { path: "Top", element: <TopPage /> },
        // 作品投稿画面
        { path: "WorkPosting", element: <WorkPosting /> },
        // 動画投稿画面
        { path: "VideoPosting", element: <VideoPosting /> },

        //プロフィール
        // Profile/の後ろにユーザーネームを指定
        { path: "Profile/:user_name", element: <ProfilePage /> },
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
