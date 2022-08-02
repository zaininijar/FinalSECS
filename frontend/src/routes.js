import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

// Mahasiswa
const Mahasiswa = React.lazy(() => import("./views/mahasiswa/Mahasiswa"));

// Mahasiswa
const Dosen = React.lazy(() => import("./views/dosen/Dosen"));

//Jurusan
const Jurusan = React.lazy(() => import("./views/jurusan/Jurusan"));

//Kelas
const Kelas = React.lazy(() => import("./views/kelas/Kelas"));

//Matakuliah
const Matakuliah = React.lazy(() => import("./views/matakuliah/Matakuliah"));
//Matakuliah
const MatakuliahMahasiswa = React.lazy(() =>
  import("./views/matakuliah/MatakuliahMahasiswa")
);

//Profile
const Profile = React.lazy(() => import("./views/profile/Profile"));

//TahunPelajaran
const TahunPelajaran = React.lazy(() =>
  import("./views/tahun-pelajaran/TahunPelajaran")
);

//Jadwal
const Jadwal = React.lazy(() => import("./views/jadwal/Jadwal"));

//Dosen Jadwal
const DosenJadwal = React.lazy(() => import("./views/pages/dosen/Jadwal"));
const DosenNilai = React.lazy(() => import("./views/pages/dosen/Nilai"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  //mahasiswa
  { path: "/mahasiswa", name: "Mahasiswa", element: Mahasiswa },
  { path: "/mahasiswa/show", name: "Show", element: Mahasiswa },

  //dosen
  { path: "/dosen", name: "Mahasiswa", element: Dosen },
  { path: "/dosen/show", name: "Show", element: Dosen },

  //jurusan
  { path: "/jurusan", name: "Jurusan", element: Jurusan },

  //kelas
  { path: "/kelas", name: "Kelas", element: Kelas },

  //matakuliah
  { path: "/matakuliah", name: "Matakuliah", element: Matakuliah },
  //matakuliah
  {
    path: "/matakuliah/set-matakuliah",
    name: "Set Matakuliah",
    element: MatakuliahMahasiswa,
  },

  //profile
  { path: "/profile", name: "Profile", element: Profile },

  //tahun-pelajaran
  { path: "/tahun-pelajaran", name: "TahunPelajaran", element: TahunPelajaran },

  //jadwal
  { path: "/jadwal", name: "Jadwal", element: Jadwal },

  //dosen-jadwal
  { path: "/dosen-jadwal", name: "Jadwal", element: DosenJadwal },

  //dosen-nilai
  { path: "/dosen-nilai", name: "Nilai", element: DosenNilai },
];

export default routes;
