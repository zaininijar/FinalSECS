import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import React from "react";
import { useAuthenticated } from "src/store/index";
import dateFormatter from "src/tools/DateFormatter";
import avatar8 from "./../../assets/images/avatars/8.jpg";

const Profile = () => {
  const [authenticated, setAuthenticated] = useAuthenticated();

  return (
    <CContainer className="montserrat">
      <CRow>
        <CCol>
          <CCard className="p-4 mb-2">Profile Page</CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={12}>
          <CCard>
            <CCardBody>
              <div className="fs-4 capitalize">
                Nama : {authenticated.user.name}
              </div>
              <div className="fs-6">
                Username : {authenticated.user.username}
              </div>
              <div className="fs-6">Role : {authenticated.user.status}</div>
              <div className="fs-6">
                Joined At : {dateFormatter(authenticated.user.createdAt)}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Profile;
