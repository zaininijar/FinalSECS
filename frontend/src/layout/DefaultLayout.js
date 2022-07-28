import React, { useEffect, useState } from "react";
import axios from "src/api/axios";
import { useAuthenticated } from "src/store/index";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";

const DefaultLayout = () => {
  const [authenticated, setAuthenticated] = useAuthenticated();
  const access_token = localStorage.getItem("access_token");

  const getUser = async (access_token) => {
    let usr = null;
    await axios
      .get("/users/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        usr = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return usr;
  };

  useEffect(() => {
    getUser(access_token).then((usr) => {
      setAuthenticated({ user: usr });
    });
  }, []);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
