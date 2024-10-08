import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import axios from "axios";

import { Header } from "./Header";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { ToDoPage } from "./ToDoPage";
import { Footer } from "./Footer";
import { TodoIndex } from "./ToDoIndex";
import { ToDoNew } from "./ToDoNewPage";

const router = createBrowserRouter([
  {
    element: (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <ToDoPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/index",
        element: <TodoIndex />,
        loader: () => axios.get("http://localhost:3000/todos.json").then(response => response.data)
      },
      {
        path: "/todo/new",
        element: <ToDoNew />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;