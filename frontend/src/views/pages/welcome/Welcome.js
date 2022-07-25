import React from "react";
import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import GuestLayout from "src/layout/GuestLayout";
import Animation from "src/assets/gif/98263-robot.gif";
import { Circle, GradientButton } from "src/components";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <GuestLayout>
        <CContainer className="mt-5 montserrat">
          <CRow className="d-flex align-items-center position-relative">
            <CCol lg={6} md={8}>
              <h1>
                Lorem ipsum dolor sit <br /> amet, consectetur <br />{" "}
                adipisicing elit.
              </h1>
              <h6 className="fw-light small mt-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                <br />
                Optio et illo iste sed amet.
              </h6>
              <div class="mt-5">
                <Link to="/login">
                  <CButton
                    color="primary"
                    className="px-4 py-2 me-3 btn-gradient-primary"
                  >
                    Get Started
                  </CButton>
                </Link>
                <GradientButton>Contact Admin</GradientButton>
              </div>
              <CRow className="mt-5 pt-5">
                <CCol className="border-r pr-4 py-0 d-flex align-items-center">
                  <div>
                    <h4 className="fw-light m-0">250K+</h4>
                    <p className="small mobile-text-xs m-0">lorem ipsum.</p>
                  </div>
                </CCol>
                <CCol className="border-r px-4 py-0 d-flex align-items-center">
                  <div>
                    <h4 className="fw-light m-0">20K+</h4>
                    <p className="small mobile-text-xs m-0 no-wrap">
                      lorem ipsum dolor sit.
                    </p>
                  </div>
                </CCol>
                <CCol className="px-4 py-0 d-flex align-items-center">
                  <div>
                    <h4 className="fw-light m-0">18%</h4>
                    <p className="small mobile-text-xs m-0 ">
                      lorem ipsum dol.
                    </p>
                  </div>
                </CCol>
              </CRow>
            </CCol>
            <CCol lg={6} md={4} className="mobile-none">
              <div className="position-absolute top-0 right-0">
                <Circle size={300} className="ms-auto" />
                <Circle size={100} className="ms-auto" />
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </GuestLayout>
    </>
  );
};

export default Welcome;
