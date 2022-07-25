import React from "react";
import { Link } from "react-router-dom";

const GradientButton = ({ children, href = "#", className }) => {
  return (
    <Link to={href} className={"btn-gradient-outline-primary " + className}>
      <div className="child">{children}</div>
    </Link>
  );
};

export default GradientButton;
