import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authenticated, Guest } from "./middleware";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./scss/style.scss";
import "izitoast-react/dist/iziToast.css";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Welcome = React.lazy(() => import("./views/pages/welcome/Welcome"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={<Guest render={<Login />} />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<Guest render={<Register />} />}
          />
          <Route
            exact
            path="/welcome"
            name="Welcome Page"
            element={<Welcome />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            path="*"
            name="Home"
            element={<Authenticated render={<DefaultLayout />} />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
