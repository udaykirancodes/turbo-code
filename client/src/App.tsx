import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignInFormPage } from "./pages/sign-in";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/sign-in",
    element: <SignInFormPage />,
  },
  {
    path: "*",
    element: <div>not found</div>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
