import React from "react";

const SvgWrapper = ({ viewBox, className, width, children, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox={viewBox}
      className={className}
      width={width}
      {...rest}>
      {children}
    </svg>
  );
};

export default SvgWrapper;
