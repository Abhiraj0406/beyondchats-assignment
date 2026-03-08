import { createBrowserRouter } from "react-router-dom";
import Integrations from "../pages/Integration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Integrations />,
  },
]);