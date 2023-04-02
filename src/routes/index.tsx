import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";

const router = createBrowserRouter(
  Object.keys(ROUTES).map((key) => ({
    path: ROUTES[key].path,
    element: ROUTES[key].element,
  }))
);

export default router;
