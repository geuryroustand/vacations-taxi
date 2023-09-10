import React from "react";
import { FaUserCircle } from "react-icons/fa";

import NavDropdown from "react-bootstrap/NavDropdown";

import styled from "./Profile.module.css";

const Profile = ({ moveToLeftTable, showDrownDownProfile, showDrownDownInTable, id }) => {
  return (
    <NavDropdown
      align="end"
      className={`
       ${moveToLeftTable && styled.moveToLeftTable}
       ${showDrownDownProfile && styled.showDrownDownProfile}
      ${showDrownDownInTable && styled.showDrownDownInTable}`}
      title={<FaUserCircle className={styled.userIcon} title="Drown Down Menu" />}
      id={id}>
      <NavDropdown.Item eventKey="1" href="/login">
        Log in
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item eventKey="2" href="/register">
        Sign up
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default Profile;
