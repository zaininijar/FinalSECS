import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { Circle, GradientButton, MsgInputError } from "src/components";
import GuestLayout from "src/layout/GuestLayout";
import axios from "src/api/axios";

const Login = () => {
  const LOGIN_URL = "/auth/signin";
  const [inputType, setInputType] = useState("password");
  const [username, setUsername] = useState({ msgErr: "", value: "" });
  const [password, setPassword] = useState({ msgErr: "", value: "" });

  const [errResp, setErrResp] = useState({});

  const handleSubmit = async () => {
    await axios
      .post(LOGIN_URL, {
        username: username.value,
        password: password.value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setErrResp(err.response.data);
      });
  };

  const handleUsername = (value) => {
    if (value === "") {
      setUsername((prev) => ({ ...prev, msgErr: "Type your username" }));
    } else {
      setUsername({ msgErr: "", value: value });
    }
  };

  const hanldePassword = (value) => {
    if (value === "") {
      setPassword((prev) => ({ ...prev, msgErr: "Type your password" }));
    } else {
      setPassword({ msgErr: "", value: value });
    }
  };

  const showPassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  return (
    <>
      <GuestLayout>
        <CContainer className="mt-5 montserrat">
          <CRow className="d-flex pt-5 align-items-center position-relative">
            <CCol md={6}>
              <h1>Sign in to your account</h1>
              <h6 className="fw-light small mt-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                <br />
                Optio et illo iste sed amet.
              </h6>
              <MsgInputError>{errResp && errResp.message}</MsgInputError>
              <CRow className="mt-5">
                <CCol lg={11}>
                  <CInputGroup className="mb-2">
                    <CFormInput
                      className={
                        username.msgErr
                          ? "cs-input-dark border-danger"
                          : "cs-input-dark"
                      }
                      type="text"
                      size="md"
                      onChange={(e) => {
                        handleUsername(e.target.value);
                      }}
                      placeholder="Username"
                      aria-label="md input example"
                    />
                    <CInputGroupText className="cs-input-dark text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                          fill="rgba(22,23,29,1)"
                        />
                      </svg>
                    </CInputGroupText>
                  </CInputGroup>
                  {username.msgErr && (
                    <MsgInputError>{username.msgErr}</MsgInputError>
                  )}
                  <CInputGroup className="mb-2">
                    <CFormInput
                      className={
                        password.msgErr
                          ? "cs-input-dark border-danger"
                          : "cs-input-dark"
                      }
                      type={inputType}
                      size="md"
                      onChange={(e) => {
                        hanldePassword(e.target.value);
                      }}
                      placeholder="Password"
                      aria-label="md input example"
                    />
                    <CInputGroupText
                      onClick={showPassword}
                      className="cs-input-dark text-white"
                    >
                      {inputType == "password" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z"
                            fill="rgba(22,23,29,1)"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                            fill="rgba(22,23,29,1)"
                          />
                        </svg>
                      )}
                    </CInputGroupText>
                  </CInputGroup>
                  {password.msgErr && (
                    <MsgInputError>{password.msgErr}</MsgInputError>
                  )}
                </CCol>
              </CRow>
              <div class="mt-5">
                <CButton
                  color="primary"
                  onClick={handleSubmit}
                  className="px-4 py-2 me-3 btn-gradient-primary"
                >
                  Login
                </CButton>
                <GradientButton>Contact Admin</GradientButton>
              </div>
            </CCol>
            <CCol md={6} className="mobile-none">
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

export default Login;
