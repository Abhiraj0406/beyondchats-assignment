import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Integrations from "../pages/Integration";
import Chats from "../pages/Chats";
import ThreadView from "../pages/ThreadView";

export const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Integrations />,
      },
      {
        path: "/chats",
        element: <Chats />,
      },
      {
        path: "/thread/:id",
        element: <ThreadView />,
      },
    ],
  },
]);