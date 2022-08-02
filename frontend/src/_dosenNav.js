import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilDescription,
  cilInput,
  cilSpeedometer,
  cilUser,
} from "@coreui/icons";
import { CNavItem } from "@coreui/react";

const _userNav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Jadwal",
    to: "/dosen-jadwal",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Nilai",
    to: "/dosen-nilai",
    icon: <CIcon icon={cilInput} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "/profile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
];

export default _userNav;
