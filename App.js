import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// halaman yang di import
import React from "react";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRecipe from "./pages/AddRecipe";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import { store } from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/add-recipe",
    element: <AddRecipe />,
  },
  
  {
    path: "/search",
    element: <Search />,
  }
]);

function App() {
  axios.interceptors.request.use((config) => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }

    return config;
  }, (error) => {
    Promise.reject(error);
  });

  return (
    <div className="App">
      <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </React.StrictMode>
    </div>
  );
}

export default App;