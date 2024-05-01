import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/LoginPage.jsx";
import store from "../store.js";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import TeacherDashboard from "./pages/TeacherDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Login />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />
      </Route>
    </Route>
  )
);
const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MantineProvider theme={theme}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    </MantineProvider>
  </Provider>
);
