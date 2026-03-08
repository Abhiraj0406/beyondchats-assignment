import { createBrowserRouter } from "react-router-dom";
import Integrations from "../pages/Integration";
import Chats from "../pages/Chats";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Integrations />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
]); 