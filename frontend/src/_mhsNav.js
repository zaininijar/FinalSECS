import React from "react";
import CIcon from "@coreui/icons-react";
import { cilCalculator, cilSpeedometer, cilUser } from "@coreui/icons";
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
    name: "Profile",
    to: "/profile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Widgets",
    to: "/widgets",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
];

export default _userNav;
