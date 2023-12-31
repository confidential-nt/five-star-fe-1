import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import PostDetail from "./pages/PostDetail";
import PostCreate from "./pages/PostCreate";
import NotFound from "./pages/NotFound";
import ResignPage from "./pages/ResignPage";
import PostEdit from "./pages/PostEdit";
import UserPosts from "./pages/UserPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: "/posts", element: <Main /> },
      {
        path: "/posts/:postid",
        element: <PostDetail />,
      },
      {
        path: "/posts/create",
        element: <PostCreate />,
      },
      {
        path: "/posts/:postid/edit",
        element: <PostEdit />,
      },
      {
        path: "/resign",
        element: <ResignPage />,
      },
      {
        path: "/posts/users",
        element: <UserPosts />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
