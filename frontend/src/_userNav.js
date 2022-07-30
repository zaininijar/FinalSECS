import React from "react";
import CIcon from "@coreui/icons-react";
import AccountSchoolOutlineIcon from "mdi-react/AccountSchoolOutlineIcon";
import HumanMaleBoardIcon from "mdi-react/HumanMaleBoardIcon";
import {
  cilBell,
  cilCalculator,
  cilCameraControl,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilFork,
  cilLan,
  cilLibrary,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilScrubber,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilUsb,
  cilUser,
  cilUserFollow,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

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
