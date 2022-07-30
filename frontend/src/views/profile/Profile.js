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
        <CCol sm={2}>
          <img src={avatar8} class="img-thumbnail" alt="profile photo" />
          <CButton color="secondary" className="me-2 mt-2 w-full text-xs px-4">
            Change Photo
          </CButton>
        </CCol>
        <CCol sm={10}>
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
            <CCardFooter>
              <CButton className="me-2">Update Profile</CButton>
              <CButton variant="outline">Update Password</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Profile;
