import React from "react";
import CIcon from "@coreui/icons-react";
import HumanMaleBoardIcon from "mdi-react/HumanMaleBoardIcon";
import {
  cilCalculator,
  cilDescription,
  cilFork,
  cilLan,
  cilLibrary,
  cilPeople,
  cilScrubber,
  cilSpeedometer,
  cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Users",
  },
  {
    component: CNavItem,
    name: "Mahasiswa",
    to: "/mahasiswa",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: "Show",
    //     to: "/mahasiswa/show",
    //   },
    // ],
  },
  {
    component: CNavItem,
    name: "Dosen",
    to: "/dosen",
    icon: <HumanMaleBoardIcon className="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: "Show",
    //     to: "/dosen/show",
    //   },
    // ],
  },
  {
    component: CNavTitle,
    name: "Others",
  },
  {
    component: CNavItem,
    name: "Jurusan",
    to: "/jurusan",
    icon: <CIcon icon={cilFork} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Kelas",
    to: "/kelas",
    icon: <CIcon icon={cilLan} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Jadwal",
    to: "/jadwal",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: "Mata Kuliah",
    to: "/matakuliah",
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Set Matakuliah",
    to: "/set-matakuliah",
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Tahun Pelajaran",
    to: "/tahun-pelajaran",
    icon: <CIcon icon={cilScrubber} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Settings",
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "/profile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
];

export default _nav;
