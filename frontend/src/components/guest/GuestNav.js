import React from "react";
import {
  CButton,
  CContainer,
  CForm,
  CFormInput,
  CNavbar,
  CNavbarBrand,
} from "@coreui/react";

const GuestNav = () => {
  return (
    <>
      <CNavbar colorScheme="light">
        <CContainer>
          <CNavbarBrand href="#">We-App</CNavbarBrand>
          <CButton color="primary" variant="outline" className="me-2">
            Sign In
          </CButton>
        </CContainer>
      </CNavbar>
    </>
  );
};

export default GuestNav;
