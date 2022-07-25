import React from "react";

const MsgInputError = ({ children }) => {
  return (
    <div>
      <p className="text-xs text-danger">{children}</p>
    </div>
  );
};

export default MsgInputError;
