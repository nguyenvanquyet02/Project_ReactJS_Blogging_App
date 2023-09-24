import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
// toi uu routing
//import vao trang nao tai trang do
const HomePage = React.lazy(() => import("./pages/HomePage"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const PostDetailsPage = React.lazy(() => import("./pages/PostDetailsPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const AuthorPage = React.lazy(() => import("./pages/AuthorPage"));
const UserUpdate = React.lazy(() => import(".//components/module/user/UserUpdate"));
const UserAddNew = React.lazy(() => import(".//components/module/user/UserAddNew"));
const UserManage = React.lazy(() => import(".//components/module/user/UserManage"));
const UserProfile = React.lazy(() => import(".//components/module/user/UserProfile"));
const PostManage = React.lazy(() => import(".//components/module/post/PostManage"));
const PostAddNew = React.lazy(() => import(".//components/module/post/PostAddNew"));
const PostUpdate = React.lazy(() => import(".//components/module/post/PostUpdate"));
const CategoryAddNew = React.lazy(() => import(".//components/module/category/CategoryAddNew"));
const CategoryManage = React.lazy(() => import(".//components/module/category/CategoryManage"));
const CategoryUpdate = React.lazy(() => import(".//components/module/category/CategoryUpdate"));
const DashboardLayout = React.lazy(() => import(".//components/module/dashboard/DashboardLayout"));
function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>
            <Route
              path="/author/:slug"
              element={<AuthorPage></AuthorPage>}
            ></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>

            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
