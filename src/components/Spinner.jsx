import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = ({ size = 40, color = "#8b5cf6", className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <ClipLoader color={color} loading={true} size={size} />
    </div>
  );
};

export default Spinner;
