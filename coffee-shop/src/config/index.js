import { Children } from "react";
import { BASE_ROUTE } from "../constant/route";

export const pageRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorNotFound />,
    Children: [
      {
        path: BASE_ROUTE,
        element: <LoginPage />,
      },
    ],
  },
]);
