import { createBrowserRouter } from "react-router-dom";
import Integrations from "../pages/Integration";
import Chats from "../pages/Chats";
import ThreadView from "../pages/ThreadView";

export const router = createBrowserRouter([
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
]);