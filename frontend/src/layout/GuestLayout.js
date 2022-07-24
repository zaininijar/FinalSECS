import { CContainer } from "@coreui/react";
import React from "react";
import { AppFooter, GuestNav } from "../components/index";

const GuestLayout = ({ children }) => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-gradient-primary">
        <GuestNav />
        <div className="body flex-grow-1 px-3">
          <CContainer>{children}</CContainer>
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;
