import { CContainer } from "@coreui/react";
import React from "react";
import { AppFooter, GuestNav } from "../components/index";

const GuestLayout = ({ children }) => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 cs-bg-dark text-light">
        <GuestNav />
        <div className="body flex-grow-1 px-3">{children}</div>
      </div>
    </div>
  );
};

export default GuestLayout;
