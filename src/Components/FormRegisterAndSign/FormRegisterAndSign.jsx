import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import styled from "./FormRegisterAndSign.module.css";
import { NEXT_PUBLIC_API_STRAPI_DEV_URL } from "../../../environment";

const FormRegisterAndSign = ({ heading, facebookBtnText, googleBtnText, children }) => {
  return (
    <div className={styled.main}>
      <h1 className={styled.heading}>{heading}</h1>
      <a
        href={`${NEXT_PUBLIC_API_STRAPI_DEV_URL}/connect/google/redirect`}
        type="submit"
        className={`${styled.googleBtn}  ${styled.socialBtn}`}>
        <FcGoogle className={styled.icons} />
        {googleBtnText}
      </a>
      <a
        href={`${NEXT_PUBLIC_API_STRAPI_DEV_URL}/connect/facebook/redirect`}
        className={`${styled.facebookIcon}  ${styled.socialBtn}`}
        type="submit">
        <ImFacebook2 className={styled.icons} />
        {facebookBtnText}
      </a>
      <hr />
      <p className={styled.or}>or</p>
      {children}
    </div>
  );
};

export default FormRegisterAndSign;
