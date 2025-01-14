/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { FaUserCircle } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";

import NavDropdown from "react-bootstrap/NavDropdown";

import styled from "./Profile.module.css";

import {
  getCookieToken,
  removeCookieToken,
  removeCookieTokenWithOutReload
} from "../../Helper/auth";
import { useFetchUserQuery } from "../../redux/AuthenticationEndpoints";

const logOut = () => {
  removeCookieToken();
};

const Profile = ({
  moveToLeftTable,
  showDrownDownProfile,
  showDrownDownInTable,
  id,
  loginText,
  signUpText,
  signOutText,
  localeLink
}) => {
  const cookieToken = getCookieToken();

  // eslint-disable-next-line no-unused-vars
  const { data, isLoading, isError } = cookieToken
    ? useFetchUserQuery(cookieToken)
    : { data: undefined, isLoading: false, isError: false };

  if (isError) {
    removeCookieTokenWithOutReload();
  }

  return (
    <NavDropdown
      align="end"
      className={`
       ${moveToLeftTable && styled.moveToLeftTable}
       ${showDrownDownProfile && styled.showDrownDownProfile}
      ${showDrownDownInTable && styled.showDrownDownInTable}`}
      title={<FaUserCircle className={styled.userIcon} title="user profile" />}
      id={id}>
      {data && !isError ? (
        <NavDropdown.Item onClick={logOut} eventKey="1" role="button">
          <LiaSignOutAltSolid /> {signOutText}
        </NavDropdown.Item>
      ) : (
        <>
          <NavDropdown.Item eventKey="1" href={`${localeLink}/login`}>
            {loginText}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="2" href={`${localeLink}/signup`}>
            {signUpText}
          </NavDropdown.Item>
        </>
      )}
    </NavDropdown>
  );
};

export default Profile;
