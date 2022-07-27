import React, { Component, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "./api/axios";
import { Authenticated, Guest } from "./middleware";
import "./scss/style.scss";
import { useAuthenticated } from "./store/index";

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
  const [authenticated, setAuthenticated] = useAuthenticated();
  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      const getUser = async (token) => {
        let user = null;
        await axios
          .get("http://localhost:3000/users/me", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            user = response.data.data;
          })
          .catch((error) => {
            console.error(error.message);
          });

        setAuthenticated({ check: true, user: user });
      };

      getUser(data);
    } else {
      setAuthenticated({ check: false, user: null });
    }
  }, []);
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
