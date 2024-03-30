import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import styled from "./FormRegisterAndSign.module.css";
import { baseURL } from "../../../environment";

const FormRegisterAndSign = ({ heading, facebookBtnText, googleBtnText, children, or }) => {
  return (
    <div className={styled.main}>
      <h1 className={styled.heading}>{heading}</h1>
      <a
        href={`${baseURL}/connect/google/redirect`}
        type="submit"
        className={`${styled.googleBtn}  ${styled.socialBtn}`}>
        <FcGoogle className={styled.icons} />
        {googleBtnText}
      </a>
      <a
        href={`${baseURL}/connect/facebook/redirect`}
        className={`${styled.facebookIcon}  ${styled.socialBtn}`}
        type="submit">
        <ImFacebook2 className={styled.icons} />
        {facebookBtnText}
      </a>
      <hr />
      <p className={styled.or}>{or}</p>
      {children}
    </div>
  );
};

export default FormRegisterAndSign;
