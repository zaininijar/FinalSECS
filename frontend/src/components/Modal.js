import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";

const Modal = ({
  children,
  btnTitle,
  btnColor,
  modalTitle,
  btnClass,
  onClick = () => {},
  onSubmit = () => {},
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CButton
        className={btnClass}
        color={btnColor}
        onClick={() => {
          onClick();
          setVisible(!visible);
        }}
      >
        {btnTitle}
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{modalTitle}</CModalTitle>
        </CModalHeader>
        <CModalBody>{children}</CModalBody>
        <CModalFooter>
          <CButton
            type="button"
            color="primary"
            variant="outline"
            data-bs-dismiss="modal"
            onClick={() => setVisible(false)}
            size="sm"
          >
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              onSubmit().then((res) => {
                if (res || res === undefined) {
                  setVisible(false);
                } else {
                  setVisible(true);
                }
              });
            }}
            size="sm"
          >
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Modal;
