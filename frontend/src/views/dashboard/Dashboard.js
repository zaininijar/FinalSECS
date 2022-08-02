import React from "react";
import { CAlert, CCol, CRow } from "@coreui/react";
import { useAuthenticated } from "src/store/index";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useAuthenticated();

  return (
    <>
      <CRow>
        <CCol xs>
          <CAlert color="light">
            Welcome "{authenticated && authenticated.user.status}" to{" "}
            <b>We-App</b>
          </CAlert>
          <CAlert className="bg-telu" color="light"></CAlert>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
