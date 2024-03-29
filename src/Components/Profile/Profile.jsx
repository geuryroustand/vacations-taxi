import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";

import Spinner from "react-bootstrap/Spinner";
import NavDropdown from "react-bootstrap/NavDropdown";

import styled from "./Profile.module.css";
import { useGetUserQuery } from "../../redux/fetchApiSlice";
import {
  getCookieToken,
  removeCookieToken,
  removeCookieTokenWithOutReload
} from "../../Helper/auth";

const logOut = () => {
  removeCookieToken();
};

const Profile = ({ moveToLeftTable, showDrownDownProfile, showDrownDownInTable, id }) => {
  const cookieToken = getCookieToken();

  const { data, isLoading, isError } = useGetUserQuery(cookieToken);

  if (isError) {
    removeCookieTokenWithOutReload();
  }

  return isLoading ? (
    <Spinner animation="border" role="status" className="spinnerColor">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <NavDropdown
      align="end"
      className={`
       ${moveToLeftTable && styled.moveToLeftTable}
       ${showDrownDownProfile && styled.showDrownDownProfile}
      ${showDrownDownInTable && styled.showDrownDownInTable}`}
      title={<FaUserCircle className={styled.userIcon} title="Drown Down Menu" />}
      id={id}>
      {data && !isError ? (
        <NavDropdown.Item onClick={logOut} eventKey="1" role="button">
          <LiaSignOutAltSolid /> Sign out
        </NavDropdown.Item>
      ) : (
        <>
          <NavDropdown.Item eventKey="1" href="/login">
            Log in
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="2" href="/register">
            Sign up
          </NavDropdown.Item>
        </>
      )}
    </NavDropdown>
  );
};

export default Profile;
