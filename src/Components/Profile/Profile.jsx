import React from "react";
import { FaUserCircle } from "react-icons/fa";

import Link from "next/link";

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
      <Link href="/login">
        <NavDropdown.Item eventKey="1" href="/login">
          Log in
        </NavDropdown.Item>
      </Link>
      <NavDropdown.Divider />
      <Link href="/register">
        <NavDropdown.Item eventKey="2" href="/register">
          Sign up
        </NavDropdown.Item>
      </Link>
    </NavDropdown>
  );
};

export default Profile;
