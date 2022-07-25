import React from "react";

const Circle = ({ size, className }) => {
  return <div className={"circle-gradient sz-" + size + " " + className}></div>;
};

export default Circle;
