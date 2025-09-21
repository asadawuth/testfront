import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../page/login/Login";
import Booking from "../page/booking/Booking";
import YourList from "../page/Yourlist/YourList";
import Layout from "./../layout/Layout";
import PathNotFound from "../component/PathNotFound";
import Authenticated from "./Authenticated";
import GuestOnly from "./GuestOnly";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Authenticated>
        <Layout />
      </Authenticated>
    ),
    children: [
      { path: "/booking", element: <Booking /> },
      { path: "/yourlist", element: <YourList /> },
      { path: "*", element: <PathNotFound /> },
    ],
  },
  {
    path: "/login",
    element: (
      <GuestOnly>
        <Login />
      </GuestOnly>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
